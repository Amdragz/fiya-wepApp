import { z } from "zod";
import { apiRequest, apiSuccessResponseSchema } from "./_setup";

export const loginResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.string()
  })
})


export const fetchLoggedInUserSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    phone_number: z.string()
  })
})

export type LoginRequest = {
  email: string,
  password: string
}

export type LoginResponse = z.infer<typeof loginResponseSchema>
export type FetchLoggedInUserResponse = z.infer<typeof fetchLoggedInUserSchema>

export const loginRequest = (loginRequest: LoginRequest) => apiRequest.post<LoginResponse>('/auth/login', loginRequest)
export const fetchLoggedInUserRequest = () => apiRequest.get<FetchLoggedInUserResponse>('/users/:id')

