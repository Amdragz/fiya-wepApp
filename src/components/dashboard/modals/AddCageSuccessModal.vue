<script setup lang="ts">
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg'
import FDialogue from '@/components/system/common/FDialogue.vue'
import FIcon from '@/components/system/common/FIcon.vue'
import { useSpmStore } from '@/stores/spm'
import { iconCopy, iconCopied } from '@/assets/images/icons'
import { ref } from 'vue'
const { newCage } = useSpmStore()


const showModal = defineModel<boolean>({ required: true })
const closeModal = () => {
  showModal.value = false
}

const successFullyCopiedDeviceToken = ref(false)
const copyDeviceToken = async () => {
  try {
    if (!newCage?.device_token) {
      successFullyCopiedDeviceToken.value = false
      return;
    }
    await navigator.clipboard.writeText(newCage?.device_token)
    successFullyCopiedDeviceToken.value = true
  } catch (error) {
    console.error('Failed to copy:', error)
    successFullyCopiedDeviceToken.value = false
  }
}
</script>

<template>
  <Transition name="add-cage-success-modal">
    <FDialogue
      v-if="showModal"
      @click.self="closeModal"
      class="add-cage-success-modal"
    >
      <div class="add-cage-sucsess-modal-container">
        <div class="header">
          <div class="logo-container">
            <img :src="fiyaLogo" alt="logo" />
          </div>
          <p>
            Cage have been added succesfully, copy the displayed device token and input it into the SPM device
          </p>
        </div>

        <div class="device-token-container">
          <p class="title">Device Token</p>
          <div class="device-token">
            <button @click="copyDeviceToken">
              <FIcon v-if="successFullyCopiedDeviceToken" :icon-path="iconCopied" :width="22" :height="22" />
              <FIcon v-else :icon-path="iconCopy" :width="24" :height="24" />
            </button>
            {{ newCage?.device_token }}
          </div>
        </div>
      </div>
    </FDialogue>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.add-cage-success-modal-enter-active,
.add-cage-success-modal-leave-active {
  transition: opacity 0.4s ease;
}

.add-cage-success-modal-enter-from,
.add-cage-success-modal-leave-to {
  opacity: 0;
}

.add-cage-success-modal {
  width: 100%;
  max-width: 1000px;

  .add-cage-sucsess-modal-container {
    width: 100%;
    max-width: 1000px;
    border-radius: 1rem;
    background-color: white;
    padding: 4rem 2rem 5rem;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.875rem;
      padding-bottom: 0.875rem;

      .title {
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--color-text-secondary);
        text-align: center;
      }
    }

    .device-token-container {
      display: grid;
      gap: 1.5rem;

      .title {
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--color-text-secondary);
        text-align: left;
      }

      .device-token {
        padding: 2rem;
        border-top: 2px solid var(--color-brand-primary-600);
        border-left: 2px solid var(--color-brand-primary-600);
        border-radius: .5rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--color-text-primary);
        position: relative;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border-radius: 100%;
          border: none;
          position: absolute;
          background-color: transparent;
          top: 0.5rem;
          right: 0.5rem;

          &:active {
            background-color: var(--color-brand-neutral-400);
          }

          .f-icon {
          fill: none;
          stroke: black;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        }
      }
    }
  }
}
</style>
