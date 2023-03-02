import axios from "axios"
import { ApiServiceHelpers } from "../../types/api/ApiServiceHelpers"
import api from "../../api/api"
import { createServiceData } from "./createServiceData"

export const createPostService =
	<
		ServiceArgs extends
			| {
					payload?: Record<string, string | number | Blob> | undefined
					[key: string]: any
			  }
			| {
					payload: Record<string, any> | undefined
					[key: string]: any
			  } = { payload: Record<string, any> },
		ServiceResponse = unknown
	>({
		urlCreator,
		isMultiPart = false,
	}: {
		urlCreator: (args: Omit<ServiceArgs, "payload">) => string
		isMultiPart?: boolean
	}) =>
	async (
		{ payload, ...args }: ServiceArgs,
		{ signal }: ApiServiceHelpers
	): Promise<ServiceResponse> => {
		const source = axios.CancelToken.source()

		signal.addEventListener("abort", () => source.cancel)

		const data = payload && createServiceData({ data: payload, isMultiPart })

		const response = await api.request<ServiceResponse>({
			url: urlCreator(args),
			method: "POST",
			cancelToken: source.token,
			headers: isMultiPart
				? {
						"Content-Type": "multipart/form-data",
				  }
				: undefined,
			data,
		})

		return response.data
	}
