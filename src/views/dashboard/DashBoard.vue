<script setup lang="ts">
import AppMenu from '@/components/shared/AppMenu.vue'
import FPage from '@/components/system/layout/FPage.vue'
import { useSpmStore } from '@/stores/spm'
import { onMounted, ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import FiyaLoader from '@/assets/images/lotties/fiya_main_loader.json'

onMounted(() => {
  fetchUsersCageInfo()
})

const { getUsersCageData, getCageHealthSettings } = useSpmStore()
const isLoading = ref<boolean>(false)

const fetchUsersCageInfo = async () => {
  try {
    isLoading.value = true
    await getUsersCageData({
      page: 1,
      per_page: 10,
    })
    await getCageHealthSettings()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <FPage>
    <template #nav-content>
      <AppMenu />
    </template>
    <div v-if="isLoading" class="fiya-main-loader-container">
      <div class="fiya-main-loader">
        <Vue3Lottie :animationData="FiyaLoader" :height="200" :width="200" />
      </div>
    </div>
    <RouterView v-else v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </FPage>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-page {
  background-color: var(--color-brand-neutral-200);

  .fiya-main-loader-container {
    padding: 1rem;

    .fiya-main-loader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100svh;
      background-color: #ffffff;
    }
  }
}
</style>
