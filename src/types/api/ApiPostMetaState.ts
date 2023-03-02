import { ApiError } from './ApiError'

export type ApiPostMetaState = {
  post: { loading: 'idle' | 'pending'; errors: ApiError | null | undefined }
}
