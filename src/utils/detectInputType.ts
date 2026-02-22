export function detectInputType(
	input: string
): 'coordinates' | 'address' | 'invalid' {
	const cleaned = input.trim().replace(/\s+/g, '')

	const coordRegex = /^[-+]?\d{1,3}(\.\d+)?[,\s;][-+]?\d{1,3}(\.\d+)?$/

	if (!coordRegex.test(cleaned)) {
		return 'address'
	}

	const parts = cleaned.split(/[,\s;]+/)
	if (parts.length !== 2) return 'invalid'

	const [a, b] = parts.map(Number)
	if (isNaN(a) || isNaN(b)) return 'invalid'

	const isLat = Math.abs(a) <= 90 || Math.abs(b) <= 90
	const isLng = Math.abs(a) <= 180 || Math.abs(b) <= 180

	return isLat && isLng ? 'coordinates' : 'invalid'
}
