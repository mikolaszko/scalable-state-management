import { createDeleteService } from "../../utils/services/createDeleteService"

export const deleteBeerService = createDeleteService<{
	beerId: number
}>({
	urlCreator: ({ beerId }) => `/api/v2/beers/${beerId}/`,
})
