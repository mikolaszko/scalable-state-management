export type BeerResponse = {
	id: number
	uid: string
	brand: string
	name: string
	style: string
	hop: string
	yeast: string
	malts: string
	ibu: string
	alcohol: string
	blg: string
}

export type BeerPayload = Partial<BeerResponse> & { id: number }
