import {
  addCageRequest,
  downloadAllCageInfoInCsvFormatRequest,
  downloadAllCageInfoInPdfFormatRequest,
  exportCageInfoInParticularDateRangeRequest,
  FileType,
  getUsersCageInfoRequest,
  type AddCageInfoResponse,
  type AddNewCageRequest,
  type ExportCageReportInCsvFormatRequest,
  type GetCageListResponse,
} from '@/api/spm'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSpmStore = defineStore('spm', () => {
  const newCage = ref<AddCageInfoResponse['data'] | null>(null)
  const cageInfoList = ref<GetCageListResponse['data']>([])

  const cageHealthInfo = computed(() => {
    const lastCage = cageInfoList.value[cageInfoList.value.length - 1]
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

  async function getUsersCageInfo(): Promise<GetCageListResponse> {
    const response = await getUsersCageInfoRequest()
    cageInfoList.value = response.data.data
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

  async function exportCageReportInParticularDateRange(payload: ExportCageReportInCsvFormatRequest) {
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


  return {
    newCage,
    cageInfoList,
    cageHealthInfo,
    addNewCage,
    getUsersCageInfo,
    downloadCageInfoInCsvFormat,
    downloadCageInfoInPdfFormat,
    exportCageReportInParticularDateRange,
  }
})
