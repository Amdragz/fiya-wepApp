<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import { useUserStore } from './stores/user'
import { computed } from 'vue'
import FiyaLoader from '@/assets/images/lotties/fiya_main_loader.json'

const { authenticating } = useUserStore()
const showPageLoader = computed(() => authenticating)
</script>

<template>
  <div v-if="showPageLoader" class="fiya-main-loader">
    <Vue3Lottie :animationData="FiyaLoader" :height="200" :width="200" />
  </div>
  <RouterView v-else />
</template>

<style scoped>
.fiya-main-loader {
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100svh;
}
</style>
