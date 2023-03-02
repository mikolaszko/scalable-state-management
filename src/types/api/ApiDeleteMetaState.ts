import { ApiError } from './ApiError'

export type ApiDeleteMetaState = {
  delete: { loading: 'idle' | 'pending'; errors: ApiError | null | undefined }
}
