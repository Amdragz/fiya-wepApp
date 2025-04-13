<script lang="ts">
export interface FPasswordInputProps {
  required?: boolean
  hasError?: boolean
  errorMessage?: string
  class?: string
  label?: string
  placeholder?: string
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FInput from './FInput.vue'
import FIcon from '../common/FIcon.vue'
import { iconEyeToggle } from '@/assets/images/icons'

const props = withDefaults(defineProps<FPasswordInputProps>(), {
  hasError: false,
})
const modelValue = defineModel<string>({ required: true, default: '' })

const togglePasswordVisibility = ref(false)
const toggleVisibility = () => {
  togglePasswordVisibility.value = !togglePasswordVisibility.value
}

const iconEyeToggleIndex = computed(() => (togglePasswordVisibility.value ? 1 : 0))
</script>

<template>
  <div class="f-password-input">
    <FInput
      v-model="modelValue"
      :type="togglePasswordVisibility ? 'text' : 'password'"
      :required="props.required"
      :has-error="props.hasError"
      :error-message="props.errorMessage"
      :label="props.label"
      :placeholder="props.placeholder"
    />
    <button type="button" class="visibity-toggle" @click="toggleVisibility">
      <FIcon
        :iconPath="iconEyeToggle[iconEyeToggleIndex]"
        :width="16"
        :height="16"
        class="eye-icon"
      />
    </button>
  </div>
</template>

<style lang="scss">
.f-password-input {
  position: relative;

  .f-input {
    width: 100%;
  }

  button {
    width: fit-content;
    border: none;
    position: absolute;
    right: 1.25rem;
    top: 50%;
    translate: 0 0.25rem;
    border-radius: 50%;
    // padding: 0.2rem 0.5rem;
    background-color: transparent;
    transition: background-color 0.2s ease-in;

    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .eye-icon {
      fill: none;
      stroke: var(--color-brand-neutral-800);
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
}
</style>
