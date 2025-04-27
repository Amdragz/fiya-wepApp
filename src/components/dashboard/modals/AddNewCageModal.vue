<script lang="ts">
const FormSchema = z.object({
  cage_id: z.string().min(1, { message: 'Cage id is required' }),
  livestock_no: z.number().min(1, { message: 'You must have atleast one livestock' }),
  assigned_monitor: z.string().min(1, { message: ' Assigned monitor is required' }),
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import FBtn from '@/components/system/form/FBtn.vue'
import FDialogue from '@/components/system/common/FDialogue.vue'
import FInput from '@/components/system/form/FInput.vue'
import FIcon from '@/components/system/common/FIcon.vue'
import { useSpmStore } from '@/stores/spm'
import { useZodForm } from '@/composables/useZodForm'
import { z } from 'zod'

const spmStore = useSpmStore()
const { addNewCage } = spmStore

const { formData, errors, validateForm, debouncedHandleChange } =
  useZodForm<typeof FormSchema.shape>(FormSchema)
const isLoading = ref(false)

const addNewUserCage = async () => {
  isLoading.value = true
  const isValid = validateForm()

  if (!isValid) return

  try {
    await addNewCage({
      cage_id: formData.value.cage_id,
      livestock_no: formData.value.livestock_no,
      assigned_monitor: formData.value.assigned_monitor,
    })
    console.log('Success')
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const showModal = defineModel<boolean>('open-add-cage', { required: true })

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <!-- <Teleport to="body"> -->
    <Transition name="add-new-cage-modal">
      <FDialogue
        v-if="showModal"
        no-backdrop-dismiss
        @click.self="closeModal"
        class="add-new-cage-model"
      >
        <div class="form-container">
          <form action="" @submit.prevent="addNewUserCage">
            <button @click="closeModal" type="button" class="close-button">
              <FIcon iconPath="M12 4L4 12M4 4L12 12" :width="16" :height="16" class="close-icon" />
            </button>
            <div class="header">
              <p class="title">Add new cage</p>
              <p class="subtitle">Register a new cage to track health</p>
            </div>

            <div class="body">
              <FInput
                v-model:model-value="formData.cage_id"
                label="Cage ID"
                placeholder="Enter ID"
                @input="debouncedHandleChange($event, 'cage_id')"
                :has-error="!!errors.cage_id"
                :error-message="errors.cage_id"
              />
              <FInput
                v-model.number.trim="formData.livestock_no"
                label="No of live stock"
                placeholder="1"
                type="number"
                @input="debouncedHandleChange($event, 'livestock_no')"
                :has-error="!!errors.livestock_no"
                :error-message="errors.livestock_no"
              />
              <FInput
                v-model:model-value="formData.assigned_monitor"
                label="Assigned monitor ID"
                placeholder="Enter ID"
                @input="debouncedHandleChange($event, 'assigned_monitor')"
                :has-error="!!errors.assigned_monitor"
                :error-message="errors.assigned_monitor"
              />
              <FBtn size="lg" type="submit" :loading="isLoading">Add new cage</FBtn>
            </div>
          </form>
        </div>
      </FDialogue>
    </Transition>
  <!-- </Teleport> -->
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.add-new-cage-modal-enter-active,
.add-new-cage-modal-leave-active {
  transition: opacity 0.4s ease;
}

.add-new-cage-modal-enter-from,
.add-new-cage-modal-leave-to {
  opacity: 0;
}

.add-new-cage-model {
  width: 100%;
  max-width: 422px;

  .form-container {
    width: 100%;
    max-width: 422px;
    border-radius: 1rem;
    background-color: white;
    padding: 4rem 1.5rem 5rem;
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

    form {
      display: grid;
      gap: 2.5rem;

      .header {
        display: grid;
        gap: 0.75rem;

        .title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-align: center;
        }

        .subtitle {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--color-text-secondary);
          text-align: center;
        }
      }

      .body {
        display: grid;
        gap: 2rem;

        .f-btn {
          margin-top: 1rem;
          border-radius: 0.5rem;
        }
      }
    }
  }
}
</style>
