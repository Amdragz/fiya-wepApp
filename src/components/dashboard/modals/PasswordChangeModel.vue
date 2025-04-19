<script lang="ts">
interface FormData {
  old_password: string
  new_password: string
  confirm_password: string
}

type FormSchema = z.infer<typeof formSchema>
const errors = ref<z.ZodFormattedError<FormSchema> | null>(null)

const formSchema = z
  .object({
    old_password: z.string().min(1, { message: 'Password is required' }),
    new_password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
    confirm_password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
  })
  .refine((formData) => formData.new_password === formData.confirm_password, {
    message: 'Password does not match',
    path: ['confirm_password'],
  })
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FPasswordInput from '@/components/system/form/FPasswordInput.vue'
import FBtn from '@/components/system/form/FBtn.vue'
import FIcon from '@/components/system/common/FIcon.vue'
import FDialogue from '@/components/system/common/FDialogue.vue'
import { z } from 'zod'
import { useDebounceFn } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

const formData = reactive<FormData>({
  old_password: '',
  new_password: '',
  confirm_password: '',
})

const validateField = (fieldName: keyof FormData) => {
  const result = formSchema.safeParse(formData)

  if (!errors.value) {
    errors.value = {} as z.ZodFormattedError<FormSchema>
  }

  if (result.success) {
    if (errors.value) {
      errors.value[fieldName] = {
        _errors: [],
      }
    }
  } else {
    const formattedErrors = result.error.format()
    errors.value = {
      ...errors.value,
      [fieldName]: formattedErrors[fieldName as keyof FormSchema],
    }
  }
}

const handleChange = useDebounceFn((e: Event, fieldName: keyof FormData) => {
  const target = e.target as HTMLInputElement
  validateField(fieldName)
}, 500)

const showModal = defineModel<boolean>('open-password-change', { required: true })

const closeModal = () => {
  showModal.value = false
}

const isLoading = ref(false)
const { changePassword } = useUserStore()

const changeUserPassword = async () => {
  isLoading.value = true
  const validSchema = formSchema.safeParse(formData)

  if (!validSchema.success) {
    errors.value = validSchema.error.format()
    return
  } else {
    errors.value = null
  }

  try {
    await changePassword({
      old_password: formData.old_password,
      new_password: formData.new_password,
    })
    console.log("successful password change")
  } catch (error) {
    console.log(error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="change-password-modal">
      <FDialogue
        v-if="showModal"
        no-backdrop-dismiss
        @click.self="closeModal"
        class="change-password-model"
      >
        <div class="form-container">
          <button @click="closeModal" type="button" class="close-button">
            <FIcon iconPath="M12 4L4 12M4 4L12 12" :width="16" :height="16" class="close-icon" />
          </button>
          <h1 class="title">Change password</h1>
          <form action="" @submit.prevent="changeUserPassword" class="change-password-form">
            <FPasswordInput
              v-model:model-value="formData.old_password"
              placeholder="Enter password"
              label="Old password"
              @input="handleChange($event, 'old_password')"
              :has-error="!!errors?.old_password?._errors?.length"
              :error-message="errors?.old_password?._errors[0]"
            />
            <FPasswordInput
              v-model:model-value="formData.new_password"
              placeholder="Enter password"
              label="New password"
              @input="handleChange($event, 'new_password')"
              :has-error="!!errors?.new_password?._errors?.length"
              :error-message="errors?.new_password?._errors[0]"
            />
            <FPasswordInput
              v-model:model-value="formData.confirm_password"
              placeholder="Enter password"
              label="Confirm password"
              @input="handleChange($event, 'confirm_password')"
              :has-error="!!errors?.confirm_password?._errors?.length"
              :error-message="errors?.confirm_password?._errors[0]"
            />
            <FBtn :loading="isLoading" size="lg" type="submit">Save password</FBtn>
          </form>
        </div>
      </FDialogue>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.change-password-modal-enter-active,
.change-password-modal-leave-active {
  transition: opacity 0.4s ease;
}

.change-password-modal-enter-from,
.change-password-modal-leave-to {
  opacity: 0;
}

.change-password-model {
  width: 100%;
  max-width: 632px;

  .form-container {
    width: 100%;
    max-width: 632px;
    border-radius: 1rem;
    background-color: white;
    padding-top: 4rem;
    padding-bottom: 5rem;
    position: relative;

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      border: none;
      background-color: #f0f2f5;
      height: 2rem;
      width: 2rem;
      border-radius: 1.625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &:active {
        background-color: rgba(0, 0, 0, 0.2);
      }

      .close-icon {
        stroke: var(--color-brand-neutral-900);
        stroke-width: 1.3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-primary);
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .change-password-form {
      display: grid;
      gap: 1.5rem;
      width: 100%;
      max-width: 426px;
      margin: 0 auto;

      .f-btn {
        margin-top: 0.5rem;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
