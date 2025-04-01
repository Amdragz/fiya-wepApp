<script lang="ts">
export interface Props {
  iconPath?: string
  width?: number
  height?: number
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  width: 24,
  height: 24,
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="f-icon"
    :width="props.width"
    :height="props.height"
    :viewBox="`0 0 ${props.width} ${props.height}`"
  >
    <slot>
      <path fill-rule="evenodd" :d="props.iconPath" />
    </slot>
  </svg>
</template>
