<script lang="ts">
export default {
  inheritAttrs: false
}

export type JSelctOptionObject = {
  label: string
  value: string | number | Record<string, number | string | symbol>
}

export type FSelectOption = string | JSelctOptionObject

export interface JSelectProps {
  required?: boolean
  hasError?: boolean
  errorMessage?: string
  class?: string
  label?: string
  placeholder?: string
  name?: string
  options?: FSelectOption[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import FField from './FField.vue'

const props = withDefaults(defineProps<JSelectProps>(), {
  class: undefined,
  label: undefined,
  hasError: false,
  errorMessage: undefined,
  placeholder: undefined,
  name: undefined,
  options: () => []
})
const modelValue = defineModel({ required: true })
const fSelectClass = computed(() => (props.hasError ? `${props.class} is-invalid` : props.class))

const isStringArray = (options: FSelectOption[]): options is string[] => {
  return options.every((option) => typeof option === 'string')
}

const isObjectArray = (options: FSelectOption[]): options is JSelctOptionObject[] => {
  return options.every(
    (option) => typeof option === 'object' && 'label' in option && 'value' in option
  )
}

const optionList = computed<JSelctOptionObject[]>(() => {
  if (isStringArray(props.options)) {
    return props.options.map((option) => ({ label: option, value: option }))
  } else if (isObjectArray(props.options)) {
    return props.options
  }
  return []
})
</script>

<template>
  <FField
    v-slot="{ fieldUid }"
    class="f-select"
    :class="fSelectClass"
    :label="props.label"
    :required="props.required"
  >
    <div class="select-wrapper">
      <select
        :id="fieldUid"
        v-model="modelValue"
        :required="props.required"
        v-bind="$attrs"
        :placeholder="props.placeholder"
        :name="props.name"
      >
        <option value="" disabled selected>{{ props.placeholder }}</option>
        <option v-for="(option, index) in optionList" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <slot v-if="props.hasError" name="invalid-feedback" :error-message="props.errorMessage">
        <span v-if="props.errorMessage" class="invalid-feedback">{{ props.errorMessage }}</span>
      </slot>
    </div>
  </FField>
</template>

<style lang="scss">
.f-select {
  display: inline-block;

  .select-wrapper {
    position: relative;

    select {
      display: block;
      appearance: none;
      transition:
        border-color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        background-position 0.3s ease-in-out;
      width: 100%;
      height: 2.75rem;
      outline: none;
      border: 1px solid #d0d5dd;
      border-radius: .5rem;
      padding: 1rem;
      background-color: var(--color-white);
      color: var(--color-grey-500);
      line-height: inherit;
      font-size: 0.875rem;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuNSA2Ljc1TDkgMTEuMjVMMTMuNSA2Ljc1IiBzdHJva2U9IiM0RDRENEQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==');
      background-repeat: no-repeat;
      background-position: right 1rem center;

      &:hover {
        border: 1px solid var(--color-brand-primary-500);
        border-color: var(--color-brand-primary-500);
        background-position-y: 1.5rem;
      }

      &:focus-visible {
        border-color: var(--color-brand-primary-600);
      }
    }

    .invalid-feedback {
      display: none;
      margin-top: 0.25rem;
      color: var(--color-red-800);
      font-size: 0.875rem;
    }
  }

  &.is-invalid {
    label {
      color: var(--color-red-800);
    }

    .select-wrapper {
      select {
        border-color: var(--color-red-800);
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxMiAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjY4NjUyMyA1LjQ5OTg0QzAuNjg2NTIzIDIuNTU0MzIgMy4wNzQzNCAwLjE2NjUwNCA2LjAxOTg2IDAuMTY2NTA0QzguOTYzOTUgMC4xNjk5MzMgMTEuMzQ5OCAyLjU1NTc0IDExLjM1MzIgNS40OTk4NEMxMS4zNTMyIDguNDQ1MzYgOC45NjUzNyAxMC44MzMyIDYuMDE5ODYgMTAuODMzMkMzLjA3NDM0IDEwLjgzMzIgMC42ODY1MjMgOC40NDUzNiAwLjY4NjUyMyA1LjQ5OTg0Wk04LjU4MTAzIDcuNzQzNjJDOC42MjE3IDcuNTg4MjMgOC41NzUzNyA3LjQyMjk4IDguNDU5ODMgNy4zMTEzOUw2LjcyNjUgNS41Nzg1QzYuNzA1NjMgNS41NTc3MyA2LjY5Mzg5IDUuNTI5NSA2LjY5Mzg5IDUuNTAwMDZDNi42OTM4OSA1LjQ3MDYxIDYuNzA1NjMgNS40NDIzOCA2LjcyNjUgNS40MjE2MUw4LjQ1OTgzIDMuNjg4MjhDOC41Nzk5NyAzLjU3Nzg2IDguNjI5OTQgMy40MTA0OCA4LjU5IDMuMjUyMjdDOC41NTAwNiAzLjA5NDA1IDguNDI2NjMgMi45NzA0NSA4LjI2ODQ3IDIuOTMwMjhDOC4xMTAzMiAyLjg5MDEyIDcuOTQyODcgMi45Mzk4NSA3LjgzMjI3IDMuMDU5ODRMNi4wOTg5NCA0Ljc5MzE3QzYuMDc4MSA0LjgxNDA3IDYuMDQ5NzkgNC44MjU4MSA2LjAyMDI3IDQuODI1ODFDNS45OTA3NiA0LjgyNTgxIDUuOTYyNDUgNC44MTQwNyA1Ljk0MTYxIDQuNzkzMTdMNC4yMDgyNyAzLjA1OTg0QzQuMDM0ODYgMi44ODYwNSAzLjc1MzM5IDIuODg1NzUgMy41Nzk2MSAzLjA1OTE3QzMuNDA1ODIgMy4yMzI1OSAzLjQwNTUyIDMuNTE0MDUgMy41Nzg5NCAzLjY4Nzg0TDUuMzEyMjcgNS40MjExN0M1LjMzMzE1IDUuNDQxOTQgNS4zNDQ4OCA1LjQ3MDE3IDUuMzQ0ODggNS40OTk2MUM1LjM0NDg4IDUuNTI5MDYgNS4zMzMxNSA1LjU1NzI5IDUuMzEyMjcgNS41NzgwNkwzLjU3ODk0IDcuMzExMzlDMy40MDU0NCA3LjQ4NDk1IDMuNDA1NDQgNy43NjYyOCAzLjU3ODk0IDcuOTM5ODRDMy43NTM2OCA4LjExMDQ1IDQuMDMyNjUgOC4xMTA0NSA0LjIwNzM5IDcuOTM5ODRMNS45NDA3MiA2LjIwNjVDNS45ODQzMyA2LjE2MzQ3IDYuMDU0NDQgNi4xNjM0NyA2LjA5ODA1IDYuMjA2NUw3LjgzMTM5IDcuOTM5ODRDNy45NDI5NyA4LjA1NTM3IDguMTA4MjIgOC4xMDE3MSA4LjI2MzYxIDguMDYxMDRDOC40MTkgOC4wMjAzNiA4LjU0MDM2IDcuODk5MDEgOC41ODEwMyA3Ljc0MzYyWiIgZmlsbD0iI0RDMjYyNiIvPgo8L3N2Zz4K');
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
      }

      .invalid-feedback {
        display: block;
      }
    }
  }

  ::placeholder {
    opacity: 1;
    font-size: 0.875rem;
    color: #98a2b3;
  }
}
</style>
