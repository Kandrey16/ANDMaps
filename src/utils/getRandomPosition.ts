import type { BoundsType } from '../types/bounds.type'

export async function getRandomPosition(bounds: BoundsType) {
  const minLat = bounds[0][0]
  const minLon = bounds[0][1]
  const maxLat = bounds[1][0]
  const maxLon = bounds[1][1]

  const lat = Number((minLat + Math.random() * (maxLat - minLat)).toFixed(6))
  const lon = Number((minLon + Math.random() * (maxLon - minLon)).toFixed(6))

  return `${lat}, ${lon}`
}
