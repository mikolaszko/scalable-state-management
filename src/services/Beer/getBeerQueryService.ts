import { BeerResponse } from "../../types/beer/beer"
import { createGetService } from "../../utils/services/createGetService"

export const getBeerQueryService = createGetService<
	{ query?: string },
	BeerResponse
>({
	urlCreator: ({ query }) =>
		query ? `/api/v2/beers/${query}` : `/api/v2/beers`,
})
