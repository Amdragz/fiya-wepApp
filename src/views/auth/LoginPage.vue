<script lang="ts">
interface FormData {
  email: string
  password: string
}
</script>

<script setup lang="ts">
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg'
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import FPasswordInput from '@/components/system/form/FPasswordInput.vue'
import FContainer from '@/components/system/layout/FContainer.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const formData = ref<FormData>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)
const router = useRouter()
const userStore = useUserStore()

const loginUser = async () => {
  console.log(formData.value.email)
  try {
    isLoading.value = true
    await userStore.login({
      email: formData.value.email,
      password: formData.value.password,
    })
    router.push({ name: 'MonitorStats' })
  } catch (error) {
    console.error('Login error:', error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="login-form-page">
    <form action="" class="login-form">
      <FContainer no-padding>
        <div class="logo-container">
          <img :src="fiyaLogo" alt="logo" />
        </div>

        <div class="header">
          <p class="title">Log in to Fiya</p>
          <p class="subtitle">Jump right back in with your email!</p>
        </div>

        <div class="body">
          <FInput type="email" v-model="formData.email" placeholder="Enter email" label="Email" />
          <FPasswordInput
            v-model:model-value="formData.password"
            placeholder="Enter password"
            label="Password"
          />
          <FBtn size="lg" full-width :loading="isLoading" @click="loginUser">Login</FBtn>
        </div>
      </FContainer>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.login-form-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 100%;
    max-width: 30rem;
    padding-top: 4rem;
    padding-bottom: 6.5rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;

    .f-container {
      width: 100%;
      max-width: 343px;
      margin: 0 auto;

      .logo-container {
        width: 87px;
        height: 87px;
        margin: 0 auto 2.5rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .header {
        display: grid;
        justify-content: center;
        gap: 0.875rem;
        margin-bottom: 2.5rem;

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
