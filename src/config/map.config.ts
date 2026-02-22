import type { LngLat, YMapLocationRequest } from 'ymaps3'

export const DEFAULT_CENTER: LngLat = [37.588144, 55.733842]
export const DEFAULT_ZOOM = 9
export const DEFAULT_DURATION = 500
export const DEFAULT_CAR_ANIMATION_DURATION = 20000

export const LOCATION: YMapLocationRequest = {
	center: DEFAULT_CENTER,
	zoom: DEFAULT_ZOOM,
	duration: DEFAULT_DURATION,
}
