import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { ApiMetaState } from "../../types/api/ApiMetaState"
import { RootState } from "../rootReducer"
import { BeerResponse } from "../../types/beer/beer"
import {
	deleteBeerAction,
	getBeerQueryAction,
	patchBeerAction,
	postBeerAction,
} from "./action"

const beerAdapter = createEntityAdapter<BeerResponse>({
	selectId: (beer) => beer.id,
})

export const beerSlice = createSlice({
	name: "beer",
	initialState: beerAdapter.getInitialState<ApiMetaState>({
		get: { loading: "idle", errors: null },
		post: { loading: "idle", errors: null },
		patch: { loading: "idle", errors: null },
		delete: { loading: "idle", errors: null },
	}),
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getBeerQueryAction.pending, (state) => {
			state.get.loading = "pending"
		})
		builder.addCase(getBeerQueryAction.fulfilled, (state, action) => {
			beerAdapter.setOne(state, action.payload)
			state.get.loading = "idle"
			state.get.errors = null
		})
		builder.addCase(getBeerQueryAction.rejected, (state, action) => {
			state.get.loading = "idle"
			state.get.errors = action.payload
		})
		builder.addCase(postBeerAction.pending, (state) => {
			state.post.loading = "pending"
		})
		builder.addCase(postBeerAction.fulfilled, (state, action) => {
			beerAdapter.addOne(state, action.payload)
			state.post.loading = "idle"
			state.post.errors = null
		})
		builder.addCase(postBeerAction.rejected, (state, action) => {
			state.post.loading = "idle"
			state.post.errors = action.payload
		})
		builder.addCase(patchBeerAction.pending, (state) => {
			state.patch.loading = "pending"
		})
		builder.addCase(patchBeerAction.fulfilled, (state, action) => {
			beerAdapter.setOne(state, action.payload)
			state.patch.loading = "idle"
			state.patch.errors = null
		})
		builder.addCase(patchBeerAction.rejected, (state, action) => {
			state.patch.loading = "idle"
			state.patch.errors = action.payload
		})
		builder.addCase(deleteBeerAction.pending, (state) => {
			state.delete.loading = "pending"
		})
		builder.addCase(deleteBeerAction.fulfilled, (state, action) => {
			beerAdapter.removeOne(state, action.meta.arg.beerId)
			state.delete.loading = "idle"
			state.delete.errors = null
		})
		builder.addCase(deleteBeerAction.rejected, (state, action) => {
			state.delete.loading = "idle"
			state.delete.errors = action.payload
		})
	},
})

export const beerSelector = beerAdapter.getSelectors<RootState>((state) => {
	return state.beer
})
