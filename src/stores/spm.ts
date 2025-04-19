import {
  addCageRequest,
  getUsersCageInfoRequest,
  type AddCageInfoResponse,
  type AddNewCageRequest,
  type GetCageListResponse,
} from '@/api/spm'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpmStore = defineStore('spm', () => {
  const newCage = ref<AddCageInfoResponse['data'] | null>(null)
  const cageInfoList = ref<GetCageListResponse['data']>([])

  async function addNewCage(payload: AddNewCageRequest): Promise<AddCageInfoResponse> {
    const response = await addCageRequest(payload)
    return response.data
  }

  async function getUsersCageInfo(): Promise<GetCageListResponse> {
    const response = await getUsersCageInfoRequest()
    cageInfoList.value = response.data.data
    return response.data
  }

  return { newCage, cageInfoList, addNewCage, getUsersCageInfo }
})
