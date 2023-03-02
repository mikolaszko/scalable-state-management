export const createServiceData = ({
	data,
	isMultiPart,
}: {
	isMultiPart: boolean
	data: Record<string, number | Blob> | Record<string, any>
}) => {
	if (!isMultiPart) {
		return data
	}

	const formData = new FormData()

	Object.entries(data).forEach(([name, value]) => {
		formData.append(name, typeof value === "number" ? `${value}` : value)
	})

	return formData
}
