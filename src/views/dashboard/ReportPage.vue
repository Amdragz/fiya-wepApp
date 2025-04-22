<script lang="ts">
interface ReportFormData {
  start_date: string
  end_date: string
  file_type: string
}
</script>

<script setup lang="ts">
import FBtn from '@/components/system/form/FBtn.vue'
import { computed, onMounted, ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import FSelect from '@/components/system/form/FSelect.vue'
import { FileType } from '@/api/spm'
import { formatISO } from 'date-fns'
import { useSpmStore } from '@/stores/spm'

const { exportCageReportInParticularDateRange, cageInfoList } = useSpmStore()

onMounted(() => {
  const endDate = new Date()
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7))
  date.value = [startDate, endDate]
})

const date = ref<[Date, Date] | null>(null)

const formattedRange = computed(() => {
  if (date.value === null) {
    return {
      start: null,
      end: null,
    }
  }
  const [start, end] = date.value

  return {
    start: formatISO(start),
    end: formatISO(end),
  }
})

watch(formattedRange, (range) => {
  reportFormData.value.start_date = range.start ?? ''
  reportFormData.value.end_date = range.end ?? ''
})

const reportFormData = ref<ReportFormData>({
  start_date: formattedRange.value.start ?? '',
  end_date: formattedRange.value.end ?? '',
  file_type: FileType.CSV,
})

const isLoading = ref(false)

const exportUserCageReportInParticularDateRange = async () => {
  try {
    if (cageInfoList === null) return
    console.log(cageInfoList[0].cage_id);
    await exportCageReportInParticularDateRange({
      cage_id: cageInfoList[0].cage_id,
      start_date: reportFormData.value.start_date,
      end_date: reportFormData.value.end_date,
      file_type: reportFormData.value.file_type as FileType
    })
  } catch (error) {
    console.log(error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="report-page">
    <div class="report-page-container">
      <h2 class="header">Download data report</h2>
      <form class="report-form" @submit.prevent="exportUserCageReportInParticularDateRange">
        <div class="time">
          <p>Select date</p>
          <VueDatePicker v-model="date" range enable-time-picker />
        </div>
        <FSelect
          label="File type"
          v-model="reportFormData.file_type"
          placeholder="Select file type"
          :options="[FileType.CSV, FileType.PDF]"
        />
        <FBtn :loading="isLoading" type="submit" size="lg">Add new cage</FBtn>
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
    height: 100vh;

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

      .time {
        background-color: #f0f2f5;
        border: 1px solid #e4e7ec;
        border-radius: 0.25rem;

        p {
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
          font-size: 0.875rem;
          font-weight: 500;
        }
      }

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
