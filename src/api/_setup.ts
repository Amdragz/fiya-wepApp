import { useUserStore } from '@/stores/user'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { z } from 'zod'

interface RefreshTokenResponse {
  message: string
  data: {
    access_token: string
    refresh_token: string
  }
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

export const apiSuccessResponseSchema = z.object({
  message: z.string(),
  data: z.any(),
})

export function getAccessToken(): string | null {
  const store = useUserStore()
  return store.access_token
}

export function setAccessToken(token: string): void {
  const store = useUserStore()
  store.access_token = token
}

export function getRefreshToken(): string | null {
  const store = useUserStore()
  return store.refresh_token
}

export function setRefreshToken(token: string): void {
  const store = useUserStore()
  store.refresh_token = token
}

enum CredentialsOption {
  Include = 'include',
  SameOrigin = 'same-origin',
  Omit = 'omit',
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

async function refreshAccessToken(): Promise<RefreshTokenResponse['data']> {
  const refresh_token = getRefreshToken()
  const body = refresh_token ? { refresh_token } : {}

  const response = await fetch(`${import.meta.env.VITE_FIYA_API_BASE_URL}/auth/refresh-token`, {
    method: HttpMethod.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: CredentialsOption.Include,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const jsonRep: RefreshTokenResponse = await response.json()
  return jsonRep.data
}

const loadAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_FIYA_API_BASE_URL,
    withCredentials: true,
  })

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken()
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/login')
      ) {
        originalRequest._retry = true

        try {
          const data = await refreshAccessToken()
          setAccessToken(data.access_token)
          setRefreshToken(data.refresh_token)

          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`
          }

          return instance(originalRequest)
        } catch (refreshError) {
          console.error('refresh token failed, redirecting to llogin...')
          return Promise.reject(refreshError)
        }
      }
    },
  )

  return instance
}

export const apiRequest = loadAxiosInstance()
