import {
  changePasswordRequest,
  fetchLoggedInUserRequest,
  loginRequest,
  logoutRequest,
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  type FetchLoggedInUserResponse,
  type LoginRequest,
  type LoginResponse,
  type LogoutResponse,
} from '@/api/auth'
import { createUser, type CreateUserRequest, type CreateUserResponse } from '@/api/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<CreateUserResponse['data'] | null>(null)
  const access_token = ref<string | null>(null)
  const refresh_token = ref<string | null>(null)
  const roles = ref<string[]>([])
  const authenticating = ref<boolean>(false)

  const isAuthenticated = computed(() => access_token.value !== null)

  async function login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await loginRequest(payload)
    access_token.value = response.data.data.access_token
    refresh_token.value = response.data.data.refresh_token
    return response.data
  }

  async function signUp(payload: CreateUserRequest): Promise<CreateUserResponse> {
    const response = await createUser(payload)
    user.value = response.data.data
    return response.data
  }

  async function fetchLoggedInuser(): Promise<FetchLoggedInUserResponse> {
    const response = await fetchLoggedInUserRequest()
    user.value = response.data.data
    return response.data
  }

  async function logout(): Promise<LogoutResponse> {
    const response = await logoutRequest()
    access_token.value = null
    refresh_token.value = null
    return response.data
  }

  async function changePassword(payload: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const response = await changePasswordRequest(payload)
    return response.data
  }

  return {
    user,
    access_token,
    refresh_token,
    roles,
    authenticating,
    isAuthenticated,
    login,
    signUp,
    fetchLoggedInuser,
    logout,
    changePassword,
  }
})
