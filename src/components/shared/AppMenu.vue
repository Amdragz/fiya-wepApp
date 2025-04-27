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
import NavMenuDropDown from './NavMenuDropDown.vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = useUserStore()
const nameInitial = getNameInitials(user?.name ?? '')
const showProfileCard = ref(false)
const showNavMenuDropDown = ref(false)
const isDisplaying = ref(false)

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value
}

const toggleMobileMenuNav = () => {
  isDisplaying.value = !isDisplaying.value
  showNavMenuDropDown.value = !showNavMenuDropDown.value
}

router.afterEach(() => {
  isDisplaying.value = false
  showNavMenuDropDown.value = false
})

const profileCardRef = ref(undefined)
const navMenuDropDownRef = ref(undefined)

onClickOutside(profileCardRef, () => {
  showProfileCard.value = false
})

onClickOutside(navMenuDropDownRef, () => {
  showNavMenuDropDown.value = false
})
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
      <div @click="toggleProfileCard" class="avatar">{{ nameInitial }}</div>
      <p @click="toggleProfileCard" class="name">{{ user?.name }}</p>

      <div class="nav-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="isDisplaying"
          @click="toggleMobileMenuNav"
        >
          <rect x="0.228516" width="32" height="32" rx="4" fill="#F6F8FC" />
          <path
            d="M22 10L10 22 M10 10L22 22"
            stroke="#212121"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-else
          @click="toggleMobileMenuNav"
        >
          <path
            d="M3 6H21M3 12H21M3 18H21"
            stroke="#212121"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div :ref="navMenuDropDownRef">
        <NavMenuDropDown v-bind:model-value="showNavMenuDropDown" />
      </div>
      <div :ref="profileCardRef">
        <ProfileCard v-bind:model-value="showProfileCard" />
      </div>
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

    .nav-icon {
      display: none;
    }
  }

  @include mixins.media-breakpoint('max-width', lg) {
    .main {
      display: none;
    }

    .profile {
      margin-left: auto;

      .nav-icon {
        display: block;
        margin-left: 1rem;
      }
    }
  }
}
</style>
