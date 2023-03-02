import { BeerResponse, BeerPayload } from "../../types/beer/beer"
import { createPostService } from "../../utils/services/createPostService"

export const postBeerService = createPostService<
	{
		payload: BeerPayload
	},
	BeerResponse
>({
	urlCreator: () => `/api/v2/beers/`,
})
