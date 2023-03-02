import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ApiError } from "../../../types/api/ApiError"
import { deleteBeerService } from "../../../services/Beer/deleteBeerService"

type deleteBeerActionArgs = {
	beerId: number
	onFailure?: (error: any) => void
	onStart?: () => void
	onSuccess?: () => void
}

export const deleteBeerAction = createAsyncThunk<
	void,
	deleteBeerActionArgs,
	{ rejectValue: ApiError }
>(
	"beer/deleteBeer",
	async (
		{ beerId, onSuccess, onFailure, onStart },
		{ rejectWithValue, signal }
	) => {
		try {
			onStart?.()
			await deleteBeerService({ beerId }, { signal })
			onSuccess?.()
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
