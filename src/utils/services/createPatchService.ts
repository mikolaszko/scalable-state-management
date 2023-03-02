import axios from "axios"
import { ApiServiceHelpers } from "../../types/api/ApiServiceHelpers"
import api from "../../api/api"

export const createPatchService =
	<
		ServiceArgs extends {
			payload: Record<string, any>
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
		{ payload: data, ...args }: ServiceArgs,
		{ signal }: ApiServiceHelpers
	): Promise<ServiceResponse> => {
		const source = axios.CancelToken.source()

		signal.addEventListener("abort", () => source.cancel)

		const response = await api.request<ServiceResponse>({
			url: urlCreator(args),
			method: "PATCH",
			cancelToken: source.token,
			headers: isMultiPart
				? { "Content-Type": "multipart/form-data" }
				: undefined,
			data,
		})

		return response.data
	}
