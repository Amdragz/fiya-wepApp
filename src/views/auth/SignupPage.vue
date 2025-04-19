<script lang="ts">
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name cannot be longer than 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters long' }),
  phone_number: z
    .string()
    .min(10, 'Phone number should be at least 10 digits long')
    .max(15, 'Phone number should be at most 15 digits long')
    .regex(/^[0-9]+$/, 'Phone number should contain digits only'),
})
</script>

<script setup lang="ts">
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg'
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import FPasswordInput from '@/components/system/form/FPasswordInput.vue'
import FContainer from '@/components/system/layout/FContainer.vue'
import { useZodForm } from '@/composables/useZodForm'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const { formData, errors, validateForm, debouncedHandleChange } = useZodForm<typeof formSchema.shape>(formSchema)
const isLoading = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()

const signup = async () => {
  const isValid = validateForm()
  if (!isValid) return

  try {
    isLoading.value = true

    await userStore.signUp({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      phone_number: formData.value.phone_number,
    })

    await userStore.login({
      email: formData.value.email,
      password: formData.value.password,
    })

    router.push({ name: 'MonitorStats' })
  } catch (error) {
    console.log(error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="signup-form-page">
    <form action="" class="signup-form" @submit.prevent="signup">
      <FContainer no-padding>
        <div class="logo-container">
          <img :src="fiyaLogo" alt="logo" />
        </div>

        <div class="header">
          <p class="title">Log in to Fiya</p>
          <p class="subtitle">Jump right back in with your email!</p>
        </div>

        <div class="body">
          <FInput
            type="text"
            v-model="formData.name"
            placeholder="Enter fullname"
            label="Name"
            @input="debouncedHandleChange($event, 'name')"
            :has-error="!!errors.name"
            :error-message="errors.name ?? ''"
          />
          <FInput
            type="email"
            v-model="formData.email"
            placeholder="Enter email"
            label="Email"
            @input="debouncedHandleChange($event, 'email')"
            :has-error="!!errors.email"
            :error-message="errors.email ?? ''"
          />
          <FPasswordInput
            v-model:model-value="formData.password"
            placeholder="Enter password"
            label="Password"
            @input="debouncedHandleChange($event, 'password')"
            :has-error="!!errors.password"
            :error-message="errors.password ?? ''"
          />
          <FInput
            type="tel"
            pattern="[0-9]{11}"
            v-model="formData.phone_number"
            placeholder="+2347047993803"
            label="Phone number"
            @input="debouncedHandleChange($event, 'phone_number')"
            :has-error="!!errors.phone_number"
            :error-message="errors.phone_number ?? ''"
          />
          <FBtn size="lg" full-width :loading="isLoading" :disabled="isLoading" type="submit"
            >Sign up</FBtn
          >
        </div>
      </FContainer>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.signup-form-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .signup-form {
    width: 100%;
    max-width: 30rem;
    padding-top: 2rem;
    padding-bottom: 2.5rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;

    .f-container {
      width: 100%;
      max-width: 343px;
      margin: 0 auto;

      .logo-container {
        width: 57px;
        height: 57px;
        margin: 0 auto 1rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .header {
        display: grid;
        justify-content: center;
        margin-bottom: 1rem;

        .title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .subtitle {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--color-text-secondary);
        }
      }

      .body {
        display: grid;
        gap: 1.5rem;

        .f-btn {
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
