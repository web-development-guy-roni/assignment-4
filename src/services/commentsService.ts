import { http } from './http'
import type { ApiComment } from '../types/api'

export async function getComments(postId: string): Promise<ApiComment[]> {
  const res = await http.get<ApiComment[]>(`/comment/post/${postId}`)
  return res.data
}

export async function createComment(params: {
  postId: string
  content: string,
  owner: string
}): Promise<ApiComment> {
  const res = await http.post<ApiComment>('/comment', {
    postId: params.postId,
    content: params.content,
    owner: params.owner,
  })
  return res.data
}

