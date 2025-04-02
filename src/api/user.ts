import { z } from "zod";
import { apiRequest, apiSuccessResponseSchema } from "./_setup";

export const createUuserResponseSchema = apiSuccessResponseSchema.extend({
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    phone_number: z.string()
  })
})

export type CreateUserRequest = {
  name: string,
  email: string,
  password: string,
  phone_number: string,
}

export type CreateUserResponse = z.infer<typeof createUuserResponseSchema>;
export const createUser = (createUserRequest: CreateUserRequest) => apiRequest.post<CreateUserResponse>("/users", createUserRequest)
