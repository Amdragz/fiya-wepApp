<script lang="ts">
export interface FContainerProps {
  fullWidth?: boolean
  noPadding?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<FContainerProps>(), {
  fullWidth: false,
  noPadding: false,
})
const containerClass = computed(() => ({
  'container-fluid': props.fullWidth,
  container: !props.fullWidth,
  'no-padding': props.noPadding,
}))
</script>

<template>
  <div class="f-container" :class="containerClass">
    <slot />
  </div>
</template>

<style lang="scss">
.f-container {
  &.no-padding {
    padding: 0;
  }
}
</style>
