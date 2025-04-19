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
  data: z.array(cageInfoResponseSchema.shape.data),
})

export type AddNewCageRequest = {
  cageId: string
  noOfLivestock: number
  assigned_monitor: string
}

export type CageInfo = z.infer<typeof cageInfoResponseSchema.shape.data>
export type AddCageInfoResponse = z.infer<typeof cageInfoResponseSchema>
export type GetCageListResponse = z.infer<typeof cageListResponseSchema>

export const addCageRequest = (createCageRequest: AddNewCageRequest) => apiRequest.post<AddCageInfoResponse>('/spm', createCageRequest)
export const getUsersCageInfoRequest = () => apiRequest.get<GetCageListResponse>("/spm/cages")
