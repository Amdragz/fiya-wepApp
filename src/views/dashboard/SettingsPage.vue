<script lang="ts">
interface SettingsFormData {
  normalTemperature: string
  normalPressure: string
  normalHumidity: string
}
</script>

<script setup lang="ts">
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import { ref } from 'vue'

const reportFormData = ref<SettingsFormData>({
  normalTemperature: '',
  normalPressure: '',
  normalHumidity: '',
})
</script>

<template>
  <div class="settings-page">
    <div class="settings-page-container">
      <h2 class="header">Health settings</h2>
      <form class="settings-form">
        <FInput
          v-model:model-value="reportFormData.normalHumidity"
          label="Normal Temperature"
          placeholder="Enter data"
        />
        <FInput
          v-model:model-value="reportFormData.normalPressure"
          label="Normal Pressure"
          placeholder="Enter data"
        />
        <FInput
          v-model:model-value="reportFormData.normalHumidity"
          label="Normal Humidity"
          placeholder="Enter data"
        />
        <FBtn size="lg">Save settings</FBtn>
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
