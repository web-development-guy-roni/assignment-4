// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
export type StoredAuthUser = {
  id: string
  username?: string
  email?: string
}

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'authUser'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getStoredUser(): StoredAuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredAuthUser
  } catch {
    return null
  }
}

export function setAuthStorage(params: {
  accessToken: string
  refreshToken?: string
  user?: StoredAuthUser
}) {
  localStorage.setItem(ACCESS_TOKEN_KEY, params.accessToken)
  if (params.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken)
  if (params.user) localStorage.setItem(USER_KEY, JSON.stringify(params.user))
}

export function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
