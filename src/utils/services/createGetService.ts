import axios, { AxiosResponseTransformer } from "axios"
import { ApiServiceHelpers } from "../../types/api/ApiServiceHelpers"
import api from "../../api/api"
import { createServiceParams } from "./createServiceParams"

export const createGetService =
	<
		ServiceArgs extends {
			params?: Record<string, string | number>
			transformResponse?: AxiosResponseTransformer
			[key: string]: any
		} = {
			[key: string]: any
		},
		ServiceResponse = unknown
	>({
		urlCreator,
		transformResponse,
	}: {
		urlCreator: (args: Omit<ServiceArgs, "params">) => `/${string}`
		transformResponse?: AxiosResponseTransformer
	}) =>
	async (
		{ params: serviceParams, ...args }: ServiceArgs,
		{ signal }: ApiServiceHelpers
	): Promise<ServiceResponse> => {
		const source = axios.CancelToken.source()

		signal.addEventListener("abort", () => source.cancel)

		const params = createServiceParams(serviceParams)

		const response = await api.request<ServiceResponse>({
			url: urlCreator(args),
			cancelToken: source.token,
			params,
			transformResponse,
		})

		return response.data
	}
