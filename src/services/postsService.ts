// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
import { http } from './http'
import type { ApiPost } from '../types/api'

export async function getPosts(): Promise<ApiPost[]> {
  const res = await http.get<ApiPost[]>('/post/')
  return res.data
}

export async function getPost(id: string): Promise<ApiPost> {
  const res = await http.get<ApiPost>(`/post/${id}`)
  return res.data
}

export async function createPost(params: {
  title: string
  content: string
  sender: string
}): Promise<ApiPost> {
  const res = await http.post<ApiPost>('/post', {
    title: params.title,
    content: params.content,
    sender: params.sender,
  })
  return res.data
}
