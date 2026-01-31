// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
import axios from 'axios'

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as unknown
    if (data && typeof data === 'object' && 'message' in data && typeof (data as any).message === 'string') {
      return (data as any).message as string
    }
    return err.message || 'Request failed'
  }

  if (err instanceof Error) return err.message
  return 'Something went wrong'
}
