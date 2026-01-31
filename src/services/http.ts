// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
import axios from 'axios'
import { getAccessToken } from './tokenStorage'

export const API_BASE_URL = 'http://localhost:3000'

export const http = axios.create({
  baseURL: API_BASE_URL,
})

http.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
