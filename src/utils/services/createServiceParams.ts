export const createServiceParams = <
	ParamKey extends string,
	Params extends Record<ParamKey, string | number> | undefined
>(
	params?: Params
) => {
	if (params === undefined) return

	const newEntries = Object.entries(params as Record<ParamKey, string | number>)
		.filter(([key, val]) => !!val)
		.map(([key, val]) => [key, typeof val === "number" ? `${val}` : val])

	const newParams = Object.fromEntries(newEntries)

	return new URLSearchParams(newParams)
}
