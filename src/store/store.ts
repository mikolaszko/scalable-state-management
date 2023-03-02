import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./rootReducer"
import authInterceptor from "./authInterceptor"

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(authInterceptor),
	devTools: process.env.NODE_ENV !== "production",
})
