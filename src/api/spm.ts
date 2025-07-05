import { z } from 'zod'
import { apiRequest, apiSuccessResponseSchema } from './_setup'

export const cageInfoResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    _id: z.string(),
    cage_id: z.string(),
    livestock_no: z.number(),
    assigned_monitor: z.string(),
    temperature: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    ammonia: z.number(),
    co2: z.number(),
    object_recognition: z.object({
      coccidiosis: z.number(),
      newcastle: z.number(),
      salmonella: z.number(),
      healthy: z.number(),
    }),
    timestamp: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
})

export const cageListResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    total_cage_data: z.number(),
    cages: z.array(cageInfoResponseSchema.shape.data),
  }),
})

export type CageInfo = z.infer<typeof cageInfoResponseSchema.shape.data>
export type GetCageDataResponse = z.infer<typeof cageListResponseSchema>

export type CagePagination = {
  offset: number
  limit: number
}

export const getUsersCageDataRequest = (pagination: CagePagination) =>
  apiRequest.get<GetCageDataResponse>('/spm/cages', {
    params: {
      offset: pagination.offset,
      limit: pagination.limit,
    },
  })

export const addCageResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    _id: z.string(),
    cage_id: z.string(),
    device_token: z.string(),
    livestock_no: z.number(),
    assigned_monitor: z.string(),
    temperature: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    ammonia: z.number(),
    co2: z.number(),
    object_recognition: z.object({
      coccidiosis: z.number(),
      newcastle: z.number(),
      salmonella: z.number(),
      healthy: z.number(),
    }),
    timestamp: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
})

export type AddNewCageRequest = {
  cage_id: string
  livestock_no: number
  assigned_monitor: string
}

export type AddCageInfoResponse = z.infer<typeof addCageResponseSchema>
export const addCageRequest = (createCageRequest: AddNewCageRequest) =>
  apiRequest.post<AddCageInfoResponse>('/spm/cages', createCageRequest)

export const downloadAllCageInfoInCsvFormatRequest = () =>
  apiRequest.get<Blob>('/spm/export/csv', { responseType: 'blob' })
export const downloadAllCageInfoInPdfFormatRequest = () =>
  apiRequest.get<Blob>('/spm/export/pdf', { responseType: 'blob' })

export enum FileType {
  CSV = 'csv',
  PDF = 'pdf',
}

export type ExportCageReportInCsvFormatRequest = {
  cage_id: string
  start_date: string
  end_date: string
  file_type: FileType
}

export const exportCageInfoInParticularDateRangeRequest = (
  payload: ExportCageReportInCsvFormatRequest,
) => apiRequest.post<Blob>('/spm/report', payload, { responseType: 'blob' })

export const updateHealthSettingsSuccessResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    temperature: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
})

export type HealthSettings = z.infer<typeof updateHealthSettingsSuccessResponseSchema>
export type UpdateHealthSettingsRequest = {
  temperature: number
  pressure: number
  humidity: number
}

export const getCageHealthSettingsRequest = (cage_id: string) =>
  apiRequest.get<HealthSettings>(`/spm/${cage_id}/health-settings`)
export const updateHealthSettingsRequest = (
  payload: UpdateHealthSettingsRequest,
  cage_id: string,
) => apiRequest.post<HealthSettings>(`/spm/${cage_id}/health-settings`, payload)
