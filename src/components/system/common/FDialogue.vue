<script lang="ts">
export interface FDialogProps {
  noEscDismiss?: boolean
  noBackdropDismiss?: boolean
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<FDialogProps>(), {
  noEscDismiss: false,
  noBackdropDismiss: false
})
const fDialog = ref<HTMLDialogElement | null>(null)
const content = ref<HTMLElement | null>(null)

const cancelDialog = (e: Event) => {
  if (props.noEscDismiss) e.preventDefault()
}

onMounted(() => {
  if (fDialog.value) {
    fDialog.value.addEventListener('cancel', cancelDialog)
    fDialog.value.showModal()
    document.body.classList.add('f-dialog-open')
  }
})

onClickOutside(content, () => {
  if (fDialog.value && !props.noBackdropDismiss) fDialog.value.close()
  document.body.classList.remove('f-dialog-open')
})

onBeforeUnmount(() => {
  if (fDialog.value) {
    fDialog.value.removeEventListener('cancel', cancelDialog)
    fDialog.value.close()
    document.body.classList.remove('f-dialog-open')
  }
})
</script>

<template>
  <dialog ref="fDialog" class="f-dialog">
    <div ref="content" class="content">
      <slot />
    </div>
  </dialog>
</template>

<style lang="scss">
@use '../../../assets/scss/abstracts/mixins';
@use '../../../assets/scss/abstracts/functions';
@use '../../../assets/scss/abstracts/variables';

::backdrop {
  --color-dialog-backdrop-rgb: #{functions.hexToRGB(variables.$grey-800)};
}

@keyframes f-dialog-show {
  0% {
    opacity: 0;
  }
}

.f-dialog {
  max-width: 100%;
  max-height: 100%;
  border: 0;
  padding: 0;
  background-color: transparent;
  margin: auto;

  &::backdrop {
    background-color: rgba(var(--color-dialog-backdrop-rgb), 0.4);
    backdrop-filter: blur(2px);
  }

  &[open],
  &::backdrop {
    animation: f-dialog-show 500ms ease;
  }
}

@include mixins.media-breakpoint('min-width', sm) {
  .f-dialog {
    min-height: auto;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
