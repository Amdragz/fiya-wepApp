<script setup lang="ts"></script>

<template>
  <div class="auth-page">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.auth-page {
  background-image: url('@/assets/images/illustrations/fiya-auth-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100svh;

  @include mixins.media-breakpoint('max-width', sm) {
    padding: 0 1rem;
  }
}
</style>
