import { z } from "zod";
import { apiRequest, apiSuccessResponseSchema } from "./_setup";

export const createUserResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    type: z.string(),
    spm_id: z.nullable(z.string()), // z.string().nullable(),
    created_customers: z.array(z.string()), // z.string().array(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime()
  })
})

export type CreateUserRequest = {
  name: string,
  email: string,
  password: string,
  phone_number: string,
}

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export const createUser = (createUserRequest: CreateUserRequest) => apiRequest.post<CreateUserResponse>("/users", createUserRequest)
