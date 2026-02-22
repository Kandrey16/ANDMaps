import type { LngLat } from '@yandex/ymaps3-types'

export function parseCoordinates(input: string): LngLat | null {
	const parts = input
		.split(',')
		.map((s) => s.trim())
		.map(Number)
	if (parts.length !== 2 || parts.some(isNaN)) return null
	const [lat, lng] = parts
	return [lng, lat]
}
