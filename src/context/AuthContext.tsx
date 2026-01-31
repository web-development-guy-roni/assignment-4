import React, { createContext, useContext, useMemo, useState } from 'react'
import {
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  setAuthStorage,
  type StoredAuthUser,
} from '../services/tokenStorage'

type AuthContextValue = {
  accessToken: string | null
  refreshToken: string | null
  user: StoredAuthUser | null
  setAuth: (params: { accessToken: string; refreshToken?: string; user: StoredAuthUser }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider(props: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => getAccessToken())
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshToken())
  const [user, setUser] = useState<StoredAuthUser | null>(() => getStoredUser())

  const value = useMemo<AuthContextValue>(() => {
    return {
      accessToken,
      refreshToken,
      user,
      setAuth: ({ accessToken: nextToken, refreshToken: nextRefresh, user: nextUser }) => {
        setAccessToken(nextToken)
        if (nextRefresh !== undefined) setRefreshToken(nextRefresh)
        setUser(nextUser)
        setAuthStorage({ accessToken: nextToken, refreshToken: nextRefresh, user: nextUser })
      },
      logout: () => {
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
        clearAuthStorage()
      },
    }
  }, [accessToken, refreshToken, user])

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

