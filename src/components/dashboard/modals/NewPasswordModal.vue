<script lang="ts">
interface FormData {
  password: string
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg'
import FPasswordInput from '@/components/system/form/FPasswordInput.vue'
import FBtn from '@/components/system/form/FBtn.vue'

const formData = ref<FormData>({
  password: '',
})

const showModal = defineModel<boolean>({ required: true })

const closeModal = () => {
  showModal.value = false
}

const isLoading = ref(false)
</script>

<template>
  <Transition name="new-password-modal">
    <JDialog
      v-if="showModal"
      no-backdrop-dismiss
      @click.self="closeModal"
      class="new-password-modal"
    >
      <div class="form-container">
        <div class="header">
          <div class="logo-container">
            <img :src="fiyaLogo" alt="logo" />
          </div>
          <p>
            Welcome! Fiya requires you to change your one-time password immediately after your first
            login. Enter new password below to complete process
          </p>
        </div>
        <form action="" class="new-password-form">
          <p class="email">Email: Janedoe@hellorichfood.com</p>
          <FPasswordInput
            v-model:model-value="formData.password"
            placeholder="Enter password"
            label="Password"
          />
          <FBtn :loading="isLoading">Save password</FBtn>
        </form>
      </div>
    </JDialog>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.new-password-modal-enter-active,
.new-password-modal-leave-active {
  transition: opacity 0.4s ease;
}

.new-password-modal-enter-from,
.new-password-modal-leave-to {
  opacity: 0;
}

.new-password-model {
  width: 100%;
  max-width: 632;
  margin: 0 auto;

  .form-container {
    width: 100%;
    max-width: 426px;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.875rem;
      padding-bottom: 0.875rem;
      border-bottom: 1px solid var(--color-text-secondary);

      .title {
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--color-text-secondary);
        text-align: center;
      }
    }

    .new-password-form {
      display: grid;
      gap: 1.5rem;

      .email {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-primary);
      }

      .f-btn {
        margin-top: 0.5rem;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
