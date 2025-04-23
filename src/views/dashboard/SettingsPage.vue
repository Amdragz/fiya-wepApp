<script lang="ts">
const formSchema = z.object({
  temperature: z.number(),
  pressure: z.number(),
  humidity: z.number(),
})
</script>

<script setup lang="ts">
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import { useZodForm } from '@/composables/useZodForm'
import { useSpmStore } from '@/stores/spm'
import { ref } from 'vue'
import { z } from 'zod'

const { updateHealthSettings } = useSpmStore()
const { formData, errors, debouncedHandleChange, validateForm } = useZodForm<typeof formSchema.shape>(formSchema)

const isLoading = ref(false)
const updateUserCageHealthSettings = async () => {
  try {
    console.log("it started but nothing happened")
    isLoading.value = true

    const isValid = validateForm();
    if (!isValid) {
      console.log("So it was not validated")
      return
    }

    await updateHealthSettings({
      temperature: formData.value.temperature,
      pressure: formData.value.pressure,
      humidity: formData.value.humidity
    })
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="settings-page">
    <div class="settings-page-container">
      <h2 class="header">Health settings</h2>
      <form @submit.prevent="updateUserCageHealthSettings" class="settings-form">
        <FInput
          v-model:model-value="formData.temperature"
          type="number"
          step="any"
          label="Normal Temperature"
          placeholder="Enter data"
          @input="debouncedHandleChange($event, 'temperature')"
          :has-error="!!errors.temperature"
          :error-message="errors.temperature"
        />
        <FInput
          v-model:model-value="formData.pressure"
          type="number"
          step="any"
          label="Normal Pressure"
          placeholder="Enter data"
          @input="debouncedHandleChange($event, 'pressure')"
          :has-error="!!errors.pressure"
          :error-message="errors.pressure"
        />
        <FInput
          v-model:model-value="formData.humidity"
          type="number"
          step="any"
          label="Normal Humidity"
          placeholder="Enter data"
          @input="debouncedHandleChange($event, 'humidity')"
          :has-error="!!errors.humidity"
          :error-message="errors.humidity"
        />
        <FBtn :loading="isLoading" type="submit" size="lg">Save settings</FBtn>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.settings-page {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-brand-neutral-200);

  .settings-page-container {
    border-radius: 0.5rem;
    padding-bottom: 3rem;
    background-color: var(--color-white);

    .header {
      padding-top: 3rem;
      margin-bottom: 2.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }

    .settings-form {
      display: grid;
      gap: 2.5rem;
      width: 100%;
      max-width: 443px;
      margin: 0 auto;

      .f-btn {
        margin-top: 1rem;
        border-radius: 0.5rem;
      }
    }
  }

  @include mixins.media-breakpoint('max-width', md) {
    .settings-page-container {
      .header {
        padding-top: 2rem;
        margin-bottom: 1rem;
      }

      .settings-form {
        gap: 1.5rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>
