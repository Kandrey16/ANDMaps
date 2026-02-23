const SPEED_KMH = {
  walking: 5,
  cycling: 15,
  driving: 60
} as const


export function countRealDuration(
  distanceMeters: number,
  profile: 'walking' | 'cycling' | 'driving'
): number {
  const speedKmh = SPEED_KMH[profile] ?? 50 // fallback
  const speedMs  = speedKmh * 1000 / 3600     // м/с
  return Math.round(distanceMeters / speedMs)
}