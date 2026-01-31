export type Id = string | number

export type LoginApiResponse = {
  accessToken: string
  refreshToken: string
  user: {
    id: Id
    username: string
    email: string
  }
}

