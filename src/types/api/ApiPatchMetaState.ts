import { ApiError } from './ApiError'

export type ApiPatchMetaState = {
  patch: { loading: 'idle' | 'pending'; errors: ApiError | null | undefined }
}
