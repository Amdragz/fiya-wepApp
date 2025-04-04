<script lang="ts">
export interface FMenuItemProps {
  active?: boolean
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<FMenuItemProps>(), {
  active: false,
})
</script>

<template>
  <a class="f-menu-item" :class="{ active: props.active }">
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.f-menu-item {
  color: var(--color-text-secondary);
  font-size: 0.825rem;
  font-weight: 400;
  font-style: normal;
  transition: all ease 0.5s;
  cursor: pointer;

  &.active {
    color: var(--color-text-primary);
  }
}
</style>
