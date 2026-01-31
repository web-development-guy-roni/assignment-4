export type Id = string | number

export type ApiUser = {
  id: Id
  username: string
  email: string
}

export type ApiPost = {
  id: Id
  title: string
  content: string
  sender: string
}

export type ApiComment = {
  id: Id
  postId: Id
  content: string
  owner: string
}

export type LoginApiResponse = {
  accessToken: string
  refreshToken: string
  user: {
    id: Id
    username: string
    email: string
  }
}

