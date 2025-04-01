<script lang="ts">
export interface FFieldProps {
  label?: string,
  required?: boolean
}
</script>

<script setup lang="ts">
import { nanoid } from 'nanoid';
const props = defineProps<FFieldProps>();
const fieldUid = `fy-${nanoid()}`;

</script>

<template>
  <div class="f-field" :class="{ required: props.required }">
    <slot name="label" :field-uid="fieldUid">
      <label v-if="props.label" :for="fieldUid">
        {{ props.label }}
      </label>
      <span v-if="props.required" class="asterisk">*</span>
    </slot>
    <slot :field-uid="fieldUid" />
  </div>
</template>

<style lang="scss" scoped>
.f-field {
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .asterisk {
    display: inline-block;
    color: red;
    font-weight: bold;
  }
}
</style>
