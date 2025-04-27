<script setup lang="ts">
import FIcon from '../system/common/FIcon.vue'
import {
  iconAdmin,
  iconMonitorStats,
  iconPoultryCage,
  iconReport,
  iconSettings,
} from '@/assets/images/icons'

const showModal = defineModel<boolean>({ required: true })

const closeMenu = () => {
  showModal.value = false
}
</script>

<template>
  <div v-if="showModal" class="f-nav-menu-drop-down">
    <div class="nav-menu-drop-down-container">
      <RouterLink @click="closeMenu" :to="{ name: 'MonitorStats' }" class="drop-down-menu-item">
        <FIcon :width="16" :height="17" :icon-path="iconMonitorStats" />
        <p>Monitor stats</p>
      </RouterLink>
      <RouterLink @click="closeMenu" :to="{ name: 'PoultryCage' }" class="drop-down-menu-item">
        <FIcon :width="16" :height="17" :icon-path="iconPoultryCage" />
        <p>Poultry cage</p>
      </RouterLink>
      <RouterLink @click="closeMenu" :to="{ name: 'Admin' }" class="drop-down-menu-item">
        <FIcon :width="16" :height="17" :icon-path="iconAdmin" />
        <p>Admin</p>
      </RouterLink>
      <RouterLink @click="closeMenu" :to="{ name: 'Report' }" class="drop-down-menu-item">
        <FIcon :width="16" :height="17" :icon-path="iconReport" />
        <p>Report</p>
      </RouterLink>
      <RouterLink @click="closeMenu" :to="{ name: 'Settings' }" class="drop-down-menu-item">
        <FIcon :width="16" :height="17" :icon-path="iconSettings" />
        <p>Settings</p>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.f-nav-menu-drop-down {
  width: 100%;
  border-radius: 0.825rem;
  background-color: var(--color-brand-neutral-400);
  z-index: 100;
  padding: 0 2rem;
  position: absolute;
  top: 100%;
  right: 2rem;

  .nav-menu-drop-down-container {
    width: 100%;
    max-width: 189px;
    margin: 2rem auto;
    display: grid;
    gap: 2rem;
    display: grid;
    gap: 1.25rem;

    .drop-down-menu-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      .f-icon {
        fill: none;
        stroke: var(--color-text-primary);
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
</style>
