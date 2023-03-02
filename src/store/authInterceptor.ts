import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "./rootReducer"

const authInterceptor: Middleware<Record<string, never>, RootState> =
	({ dispatch }) =>
	(next) =>
	(action) => {
		//imaginery reason to logout
		const loggingOut = action.type === "invalid"
		if (loggingOut) {
			console.log("logging out")
		}
		next(action)
	}

export default authInterceptor
