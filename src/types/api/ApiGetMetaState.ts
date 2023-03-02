import { ApiError } from './ApiError'

export type ApiGetMetaState = {
  get: { loading: 'idle' | 'pending'; errors: ApiError | null | undefined }
}

export type ApiGetMetaStateWithData<T> = ApiGetMetaState & {
  data: T
}
