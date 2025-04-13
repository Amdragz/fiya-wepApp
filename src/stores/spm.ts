import {
  addCageRequest,
  getCageListRequest,
  type AddCageInfoResponse,
  type AddNewCageRequest,
  type GetCageListResponse,
} from '@/api/spm'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpmStore = defineStore('spm', () => {
  const newCage = ref<AddCageInfoResponse['data'] | null>(null)
  const cageList = ref<GetCageListResponse['data']>([])

  async function addNewCage(payload: AddNewCageRequest): Promise<AddCageInfoResponse> {
    const response = await addCageRequest(payload)
    return response.data
  }

  async function getCageList(): Promise<GetCageListResponse> {
    const response = await getCageListRequest()
    return response.data
  }

  return { newCage, cageList, addNewCage, getCageList }
})
