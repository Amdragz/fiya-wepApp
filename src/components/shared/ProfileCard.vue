<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import FIcon from '../system/common/FIcon.vue'
import { iconPadLock, iconSignOut } from '@/assets/images/icons'
import { getNameInitials } from '@/utils/helper'
import PasswordChangeModel from '../dashboard/modals/PasswordChangeModel.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showModal = defineModel<boolean>({ required: true })
const showPasswordChangeModal = ref(false)

const openPasswordChangeModal = () => {
  showPasswordChangeModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const { user, logout } = useUserStore()
const router = useRouter()
const nameInitial = getNameInitials(user?.name ?? '')
const isLoggingOut = ref(false)

const logoutUser = async () => {
  try {
    isLoggingOut.value = true
    await logout()
    router.replace({ name: 'AuthLogin' })
  } catch (error) {
    console.log(error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div v-if="showModal" class="f-profile-card">
    <div class="profile-card-container" @click.self="closeModal">
      <div class="avatar">{{ nameInitial }}</div>
      <div class="detail">
        <p class="name">{{ user?.name }}</p>
        <p class="email">{{ user?.email }}</p>
      </div>
      <div class="divider"></div>
      <div class="actions">
        <div @click="openPasswordChangeModal">
          <FIcon :width="16" :height="16" :icon-path="iconPadLock" />
          <p>Change password</p>
        </div>
        <div @click="logoutUser">
          <FIcon :width="16" :height="16" :icon-path="iconSignOut" />
          <p v-if="isLoggingOut">Logging out .....</p>
          <p v-else>Sign out</p>
        </div>
      </div>
    </div>
    <PasswordChangeModel v-model:open-password-change="showPasswordChangeModal" />
  </div>
</template>

<style lang="scss" scoped>
.f-profile-card {
  border-radius: 0.825rem;
  background-color: var(--color-brand-neutral-400);
  z-index: 100;
  padding: 0 2rem;
  position: absolute;
  top: 100%;
  right: 0;

  .profile-card-container {
    width: 100%;
    max-width: 189px;
    margin: 2rem auto;
    display: grid;
    gap: 2rem;

    .avatar {
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      color: var(--color-white);
      font-size: 1.5rem;
      font-weight: 600;
    }

    .detail {
      .name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-brand-neutral-1000);
        margin-bottom: 0.25rem;
      }

      .email {
        font-size: 0.875rem;
        font-weight: 400;
        color: #667185;
      }
    }

    .divider {
      border: 1px solid #d9d9d9;
      height: 1px;
    }

    .actions {
      display: grid;
      gap: 1.25rem;

      div {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        .f-icon {
          fill: none;
          stroke: #667185;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        p {
          font-size: 0.875rem;
          font-weight: 400;
          color: #667185;
        }
      }
    }
  }
}
</style>
