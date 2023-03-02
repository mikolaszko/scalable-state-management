import axios from "axios"
import { ApiServiceHelpers } from "../../types/api/ApiServiceHelpers"
import api from "../../api/api"

export const createDeleteService =
	<
		ServiceArgs extends Record<string, any> = Record<"string", any>,
		ServiceResponse = void
	>({
		urlCreator,
	}: {
		urlCreator: (args: ServiceArgs) => string
	}) =>
	async (
		args: ServiceArgs,
		{ signal }: ApiServiceHelpers
	): Promise<ServiceResponse> => {
		const source = axios.CancelToken.source()

		signal.addEventListener("abort", () => source.cancel)

		const { data } = await api.request<ServiceResponse>({
			url: urlCreator(args),
			method: "DELETE",
			cancelToken: source.token,
		})

		return data
	}
