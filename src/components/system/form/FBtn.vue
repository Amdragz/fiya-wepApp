<script lang="ts">
interface FBtnProps {
  color?: 'primary' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'lg'
  href?: string
  target?: string
  loading?: boolean
}
</script>

<script lang="ts" setup>
import FSpinner from '../common/FSpinner.vue'

const props = withDefaults(defineProps<FBtnProps>(), {
  color: 'primary',
  disabled: false,
  fullWidth: false,
  size: 'sm',
  target: '',
  loading: false,
})
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    class="f-btn"
    :class="{
      [props.color]: props.color,
      disabled: props.disabled,
      'full-width': props.fullWidth,
      'loading-state': props.loading,
    }"
    :target="props.target"
  >
    <slot name="loading">
      <div class="loading-content" v-if="props.loading">
        <FSpinner color="white" :size="20" />
      </div>
    </slot>

    <span class="button-content">
      <slot></slot>
    </span>
  </a>
  <button
    v-else
    type="button"
    class="f-btn"
    :class="{
      [props.color]: props.color,
      'full-width': props.fullWidth,
      [props.size]: props.size,
      'loading-state': props.loading,
    }"
    :disabled="props.disabled"
  >
    <slot name="loading">
      <div class="loading-content" v-if="props.loading">
        <FSpinner color="white" :size="20" />
      </div>
    </slot>

    <span class="button-content">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.f-btn {
  display: inline-block;
  appearance: none;
  user-select: none;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
  cursor: pointer;
  outline: 0;
  box-shadow: var(--base-shadow);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  height: 2.5rem;
  padding: 0.625rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.02em;

  &.loading-state {
    position: relative;

    .loading-content {
      position: absolute;
      left: 0;
      width: 100%;
    }

    .button-content {
      visibility: hidden;
    }
  }

  &.lg {
    height: 3rem;
    padding: 0.65rem 2rem;
    font-size: 1rem;
    white-space: nowrap;
  }

  &.full-width {
    width: 100%;
  }

  &.disabled,
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    box-shadow: none;
  }

  &.primary {
    border-color: var(--color-brand-primary);
    background-color: var(--color-brand-primary);
    color: var(--color-white);

    &.active {
      box-shadow: none;
    }

    &:focus-visible {
      box-shadow: 0 0 4px var(--color-brand-primary);
      background-color: var(--color-brand-primary);
    }
  }

  &.secondary {
    border-color: var(--color-brand-primary);
    background-color: var(--color-white);
    color: var(--color-brand-primary);

    &:active {
      box-shadow: var(--inner-shadow);
    }

    &:focus-visible {
      box-shadow: 0 0 4px var(--color-white);
      background-color: var(--color-white);
    }
  }
}

@media (hover: hover) {
  .f-btn {
    &.primary {
      &:hover {
        border-color: var(--color-brand-primary-700);
        background-color: var(--color-brand-primary-700);
      }
    }

    &.secondary {
      &:hover {
        border-color: var(--color-white);
        background-color: var(--color-white);
      }
    }
  }
}
</style>
