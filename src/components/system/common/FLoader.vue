<script setup lang="ts">
import FSpinner from './FSpinner.vue';
</script>

<template>
  <div class="f-loader">
    <FSpinner color="white" :size="38" />
  </div>
</template>

<style lang="scss">
@use '../../../assets/scss/abstracts/functions';
@use '../../../assets/scss/abstracts/variables';

:root {
  --color-loader-backdrop-rgb: #{functions.hexToRGB(variables.$white)};
}

@keyframes f-loader-ring-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.f-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(var(--color-loader-backdrop-rgb), 0.8);
}
</style>
