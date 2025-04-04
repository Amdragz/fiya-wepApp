<script lang="ts">
interface FPageProps {
  showNavBar?: boolean
  isLoading?: boolean
}
</script>

<script setup lang="ts">
import FLoader from '../common/FLoader.vue'
import FPageHeader from './FPageHeader.vue'

const props = withDefaults(defineProps<FPageProps>(), {
  showNavBar: true,
  isLoading: false,
})
</script>

<template>
  <div class="f-page">
    <FLoader v-if="props.isLoading" />
    <template v-else>
      <FPageHeader>
        <slot name="nav-content" />
      </FPageHeader>
      <main class="main-page">
        <slot />
      </main>
    </template>
  </div>
</template>
