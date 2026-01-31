// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
import { http } from './http'
import type { ApiUser } from '../types/api'

export async function getUser(id: string): Promise<ApiUser> {
  const res = await http.get<ApiUser>(`/users/${id}`)
  return res.data
}

export async function updateUser(params: {
  id: string
  username: string
  email: string
}): Promise<ApiUser> {
  const { id, username, email } = params

  const res = await http.put<ApiUser>(`/user/${id}`, { username, email })
  return res.data
}
