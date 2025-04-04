<script lang="ts">
interface FormData {
  name: string,
  email: string,
  password: string,
  phone_number: string,
}
</script>

<script setup lang="ts">
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg'
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import FPasswordInput from '@/components/system/form/FPasswordInput.vue'
import FContainer from '@/components/system/layout/FContainer.vue'
import { ref } from 'vue'

const formData = ref<FormData>({
  name: '',
  email: '',
  password: '',
  phone_number: '',
})

const isLoading = ref<boolean>(false)

</script>

<template>
  <main class="signup-form-page">
    <form action="" class="signup-form">
      <FContainer no-padding>
        <div class="logo-container">
          <img :src="fiyaLogo" alt="logo" />
        </div>

        <div class="header">
          <p class="title">Log in to Fiya</p>
          <p class="subtitle">Jump right back in with your email!</p>
        </div>

        <div class="body">
          <FInput type="text" v-model="formData.name" placeholder="Enter fullname" label="Name" />
          <FInput type="email" v-model="formData.email" placeholder="Enter email" label="Email" />
          <FPasswordInput
            v-model:model-value="formData.password"
            placeholder="Enter password"
            label="Password"
          />
          <FInput type="tel" pattern="[0-9]{11}" v-model="formData.phone_number" placeholder="+2347047993803" label="Phone number" />
          <FBtn size="lg" full-width :loading="isLoading" @click="() => {}">Login</FBtn>
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
        width: 87px;
        height: 87px;
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
