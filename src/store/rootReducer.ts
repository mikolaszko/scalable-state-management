import { combineReducers } from "@reduxjs/toolkit"
import { beerSlice } from "./Beer/beerSlice"

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
	beer: beerSlice.reducer,
})
