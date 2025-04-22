<script setup lang="ts">
import AppMenu from '@/components/shared/AppMenu.vue'
import FPage from '@/components/system/layout/FPage.vue'
// import { useSpmStore } from '@/stores/spm'
// import { onMounted, ref } from 'vue'

// onMounted(() => {
//   fetchUsersCageInfo()
// })

// const { getUsersCageInfo } = useSpmStore()
// const isLoading = ref<boolean>(false)

// const fetchUsersCageInfo = async () => {
//   try {
//     isLoading.value = true
//     console.log('its fetching')
//     await getUsersCageInfo()
//   } catch (error) {
//     console.log(error)
//     isLoading.value = false
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <FPage>
    <template #nav-content>
      <AppMenu />
    </template>
    <RouterView v-slot="{ Component }">
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
}
</style>
