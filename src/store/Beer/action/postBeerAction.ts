import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ApiError } from "../../../types/api/ApiError"
import { BeerPayload, BeerResponse } from "../../../types/beer/beer"
import { postBeerService } from "../../../services/Beer/postBeerService"

type postBeerActionArgs = {
	payload: BeerPayload
	onFailure?: (error: any) => void
	onStart?: () => void
	onSuccess?: (results: BeerResponse) => void
}

export const postBeerAction = createAsyncThunk<
	BeerResponse,
	postBeerActionArgs,
	{ rejectValue: ApiError }
>(
	"beer/postBeer",
	async (
		{ payload, onSuccess, onFailure, onStart },
		{ rejectWithValue, signal }
	) => {
		try {
			onStart?.()
			const results = await postBeerService({ payload }, { signal })
			onSuccess?.(results)
			return results
		} catch (error: any) {
			onFailure?.(error)
			return rejectWithValue(
				axios.isAxiosError(error) && error.response
					? error.response.data
					: { error }
			)
		}
	}
)
