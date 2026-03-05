import type { LngLat } from '@yandex/ymaps3-types'

function isValidLat(lat: number) {
  return lat >= -90 && lat <= 90
}

function isValidLng(lng: number) {
  return lng >= -180 && lng <= 180
}

export function parseCoordinates(input: string): LngLat | null {
  if (!input) return null

  const parts = input
    .split(',')
    .map(s => s.trim())
    .map(Number)

  if (parts.length !== 2 || parts.some(isNaN)) return null

  const [lat, lng] = parts

  if (!isValidLat(lat) || !isValidLng(lng)) return null

  return [lng, lat]
}
