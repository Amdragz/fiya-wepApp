<template>
  <div class="f-menu">
    <slot />
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/abstracts/mixins';

.f-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  transition: 0.5s ease-in-out;
}
</style>
