import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getBeerQueryService } from "../../../services/Beer/getBeerQueryService"
import { BeerResponse } from "../../../types/beer/beer"
import { ApiError } from "../../../types/api/ApiError"

type getBeerQueryActionArgs = {
	query?: string
	onFailure?: (error: any) => void
	onStart?: () => void
	onSuccess?: () => void
}

export const getBeerQueryAction = createAsyncThunk<
	BeerResponse,
	getBeerQueryActionArgs,
	{ rejectValue: ApiError }
>(
	"beer/getBeerQuery",
	async (
		{ query, onSuccess, onFailure, onStart },
		{ rejectWithValue, signal }
	) => {
		try {
			onStart?.()
			const results = await getBeerQueryService({ query }, { signal })
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
