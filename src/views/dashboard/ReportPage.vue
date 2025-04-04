<script lang="ts">
interface ReportFormData {
  date: string
  dataCategory: string
  fileType: string
}
</script>

<script setup lang="ts">
import FBtn from '@/components/system/form/FBtn.vue'
import FInput from '@/components/system/form/FInput.vue'
import { ref } from 'vue'

const reportFormData = ref<ReportFormData>({
  date: '',
  dataCategory: '',
  fileType: '',
})
</script>

<template>
  <div class="report-page">
    <div class="report-page-container">
      <h2 class="header">Download data report</h2>
      <form class="report-form">
        <FInput
          v-model:model-value="reportFormData.date"
          label="Select date"
          placeholder="DD/MM/YY"
        />
        <FInput
          v-model:model-value="reportFormData.dataCategory"
          label="Select data category"
          placeholder="Enter email"
        />
        <FInput v-model:model-value="reportFormData.fileType" label="File type" placeholder="CSv" />
        <FBtn size="lg">Add new cage</FBtn>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.report-page {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-brand-neutral-200);

  .report-page-container {
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

    .report-form {
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
    .report-page-container {
      .header {
        padding-top: 2rem;
        margin-bottom: 1rem;
      }

      .report-form {
        gap: 1.5rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>
