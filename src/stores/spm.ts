import {
  addCageRequest,
  downloadAllCageInfoInCsvFormatRequest,
  downloadAllCageInfoInPdfFormatRequest,
  exportCageInfoInParticularDateRangeRequest,
  FileType,
  getCageHealthSettingsRequest,
  getUsersCageDataRequest,
  updateHealthSettingsRequest,
  type AddCageInfoResponse,
  type AddNewCageRequest,
  type CagePagination,
  type ExportCageReportInCsvFormatRequest,
  type GetCageDataResponse,
  type HealthSettings,
  type UpdateHealthSettingsRequest,
} from '@/api/spm'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSpmStore = defineStore('spm', () => {
  const newCage = ref<AddCageInfoResponse['data'] | null>(null)
  const totalCageData = ref<number | null>(null)
  const cageDataList = ref<GetCageDataResponse['data']['cages']>([])
  const healthSettings = ref<HealthSettings['data'] | null>(null)
  const currentPage = ref<number>(1)
  const fetchedPages = ref<number[]>([1])

  const cageHealthInfo = computed(() => {
    const lastCage = cageDataList.value[0]
    if (!lastCage)
      return {
        healthy: 0,
        unHealthy: 0,
        unAvailableMonitors: 0,
      }
    const unHealthyValue = (10 - lastCage.object_recognition.healthy) * 10
    const healthyValue = lastCage.object_recognition.healthy * 10

    return {
      healthy: healthyValue,
      unHealthy: unHealthyValue,
      unAvailableMonitors: 0,
    }
  })

  async function addNewCage(payload: AddNewCageRequest): Promise<AddCageInfoResponse> {
    const response = await addCageRequest(payload)
    return response.data
  }

  async function getUsersCageData(pagination: CagePagination): Promise<GetCageDataResponse> {
    const response = await getUsersCageDataRequest(pagination)
    const cageData = response.data.data.cages

    totalCageData.value = response.data.data.total_cage_data
    cageDataList.value.push(...cageData)

    return response.data
  }

  async function downloadCageInfoInCsvFormat(): Promise<void> {
    const response = await downloadAllCageInfoInCsvFormatRequest()

    const blob = new Blob([response.data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'cage_data.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  async function downloadCageInfoInPdfFormat(): Promise<void> {
    const response = await downloadAllCageInfoInPdfFormatRequest()

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'cage_data.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  async function exportCageReportInParticularDateRange(
    payload: ExportCageReportInCsvFormatRequest,
  ) {
    const response = await exportCageInfoInParticularDateRangeRequest(payload)

    const mimeType = payload.file_type === FileType.PDF ? 'application/pdf' : 'text/csv'
    const fileExtension = payload.file_type === FileType.PDF ? 'pdf' : 'csv'

    const blob = new Blob([response.data], { type: mimeType })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `cage_data.${fileExtension}`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  async function getCageHealthSettings() {
    if (cageDataList.value.length === 0) {
      console.log('cage list info is empty and does not exist')
      return
    }
    const cage_id = cageDataList.value[0].cage_id
    const response = await getCageHealthSettingsRequest(cage_id)
    healthSettings.value = response.data.data
    return response.data
  }

  async function updateHealthSettings(payload: UpdateHealthSettingsRequest) {
    if (cageDataList.value.length === 0) {
      console.log('cage list info is empty and does not exist')
      return
    }
    const cage_id = cageDataList.value[0].cage_id
    const response = await updateHealthSettingsRequest(payload, cage_id)
    healthSettings.value = response.data.data
    return response.data
  }

  return {
    newCage,
    cageDataList,
    cageHealthInfo,
    healthSettings,
    addNewCage,
    getUsersCageData,
    downloadCageInfoInCsvFormat,
    downloadCageInfoInPdfFormat,
    exportCageReportInParticularDateRange,
    getCageHealthSettings,
    updateHealthSettings,
    totalCageData,
    currentPage,
    fetchedPages,
  }
})
