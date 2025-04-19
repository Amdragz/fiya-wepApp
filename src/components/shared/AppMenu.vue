<script lang="ts">
export interface MenuLink {
  name: string
  routeName: string
  icon: string
}
</script>

<script setup lang="ts">
import FMenuItem from '../system/layout/FMenuItem.vue'
import FIcon from '../system/common/FIcon.vue'
import {
  iconAdmin,
  iconMonitorStats,
  iconNotification,
  iconPoultryCage,
  iconReport,
  iconSettings,
} from '@/assets/images/icons'
import FMenu from '../system/layout/FMenu.vue'

import { useUserStore } from '@/stores/user'
import { getNameInitials } from '@/utils/helper'
import ProfileCard from './ProfileCard.vue'
import { ref } from 'vue'

const { user } = useUserStore()
const nameInitial = getNameInitials(user?.name ?? '')
const showProfileCard = ref(false)

const toggleprofileCard = () => {
  showProfileCard.value = !showProfileCard.value
}
</script>

<template>
  <FMenu class="app-menu">
    <div class="main">
      <FMenuItem>
        <RouterLink :to="{ name: 'MonitorStats' }" class="menu-item">
          <FIcon :width="16" :height="17" :icon-path="iconMonitorStats" />
          <p>Monitor stats</p>
          <span class="underline"></span
        ></RouterLink>
      </FMenuItem>
      <FMenuItem>
        <RouterLink :to="{ name: 'PoultryCage' }" class="menu-item">
          <FIcon :width="16" :height="17" :icon-path="iconPoultryCage" />
          <p>Poultry cage</p>
          <span class="underline"></span
        ></RouterLink>
      </FMenuItem>
      <FMenuItem>
        <RouterLink :to="{ name: 'Admin' }" class="menu-item">
          <FIcon :width="16" :height="17" :icon-path="iconAdmin" />
          <p>Admin</p>
          <span class="underline"></span
        ></RouterLink>
      </FMenuItem>
      <FMenuItem>
        <RouterLink :to="{ name: 'Report' }" class="menu-item">
          <FIcon :width="16" :height="17" :icon-path="iconReport" />
          <p>Report</p>
          <span class="underline"></span
        ></RouterLink>
      </FMenuItem>
      <FMenuItem>
        <RouterLink :to="{ name: 'Settings' }" class="menu-item">
          <FIcon :width="16" :height="17" :icon-path="iconSettings" />
          <p>Settings</p>
          <span class="underline"></span
        ></RouterLink>
      </FMenuItem>
    </div>
    <div class="profile">
      <FIcon :width="20" :height="20" :icon-path="iconNotification" />
      <div @click="toggleprofileCard" class="avatar">{{ nameInitial }}</div>
      <p @click="toggleprofileCard" class="name">{{ user?.name }}</p>

      <ProfileCard v-bind:model-value="showProfileCard"/>
    </div>
  </FMenu>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.app-menu {
  width: 100%;
  max-width: 1248px;

  .main {
    display: flex;
    gap: 2rem;
    justify-content: space-between;

    .f-menu-item {
      .menu-item {
        display: flex;
        gap: 0.5rem;
        color: var(--color-text-secondary);
        position: relative;

        .underline {
          display: none;
          width: 100%;
          border-bottom: 3px solid var(--color-text-secondary);
          bottom: -100%;
          position: absolute;
        }

        &.router-link-exact-active {
          color: var(--color-text-primary);
          // border-bottom: 2px solid var(--color-text-secondary);

          .underline {
            display: block;
          }
        }

        .f-icon {
          fill: none;
          stroke: var(--color-text-primary);
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      }
    }
  }

  .profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .f-icon {
      stroke: var(--color-text-primary);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
      fill: none;
    }

    .avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      color: var(--color-white);
      font-size: 0.875rem;
      font-weight: 600;
      margin-left: 1.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
    }

    .name {
      font-size: 0.825rem;
      font-weight: 400;
      white-space: nowrap;
      cursor: pointer;
    }
  }

  @include mixins.media-breakpoint('max-width', lg) {
    .main {
      display: none;
    }

    .profile {
      margin-left: auto;
    }
  }
}
</style>
