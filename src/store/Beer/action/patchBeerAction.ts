import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BeerPayload, BeerResponse } from "../../../types/beer/beer"
import { patchBeerService } from "../../../services/Beer/patchBeerService"
import { ApiError } from "../../../types/api/ApiError"

type patchBeerActionArgs = {
	beerId: number
	payload: BeerPayload
	onFailure?: (error: any) => void
	onStart?: () => void
	onSuccess?: () => void
}

export const patchBeerAction = createAsyncThunk<
	BeerResponse,
	patchBeerActionArgs,
	{ rejectValue: ApiError }
>(
	"beer/patchBeer",
	async (
		{ beerId, payload, onSuccess, onFailure, onStart },
		{ rejectWithValue, signal }
	) => {
		try {
			onStart?.()
			const results = await patchBeerService({ beerId, payload }, { signal })
			onSuccess?.()
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
