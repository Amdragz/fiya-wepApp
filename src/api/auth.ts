import { z } from 'zod'
import { apiRequest, apiSuccessResponseSchema } from './_setup'

export const loginResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.string(),
  }),
})

export const fetchLoggedInUserSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    type: z.string(),
    spm_id: z.nullable(z.string()), // z.string().nullable(),
    created_customers: z.array(z.string()), // z.string().array(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
})

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = z.infer<typeof loginResponseSchema>
export type FetchLoggedInUserResponse = z.infer<typeof fetchLoggedInUserSchema>

export const loginRequest = (loginRequest: LoginRequest) => apiRequest.post<LoginResponse>('/auth/login', loginRequest)
export const fetchLoggedInUserRequest = () => apiRequest.get<FetchLoggedInUserResponse>('auth/user')

export const changePasswordResponseSchema = apiSuccessResponseSchema.extend({
  data: z.null()
})

export type ChangePasswordRequest = {
  old_password: string,
  new_password: string
}

export type ChangePasswordResponse = z.infer<typeof changePasswordResponseSchema>
export const changePasswordRequest = (payload: ChangePasswordRequest) => apiRequest.post<ChangePasswordResponse>('/auth/change-password', payload)

export const logoutResponseSchema = apiSuccessResponseSchema.pick({
  message: true
})

export type LogoutResponse = z.infer<typeof logoutResponseSchema>
export const logoutRequest = () => apiRequest.post<LogoutResponse>('/auth/logout')
