import { ApiDeleteMetaState } from "./ApiDeleteMetaState"
import { ApiGetMetaState } from "./ApiGetMetaState"
import { ApiPatchMetaState } from "./ApiPatchMetaState"
import { ApiPostMetaState } from "./ApiPostMetaState"

export type ApiMetaState = ApiGetMetaState &
	ApiPostMetaState &
	ApiPatchMetaState &
	ApiDeleteMetaState
