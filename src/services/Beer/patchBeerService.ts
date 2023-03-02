import { BeerResponse } from "../../types/beer/beer"
import { createPatchService } from "../../utils/services/createPatchService"

type BeerPatchPayload = Partial<BeerResponse>

export const patchBeerService = createPatchService<
	{
		beerId: number
		payload: BeerPatchPayload
	},
	BeerResponse
>({
	urlCreator: ({ beerId }) => `/api/v2/beers/${beerId}/`,
})
