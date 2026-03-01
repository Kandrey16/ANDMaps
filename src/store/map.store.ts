import type { LngLat } from '@yandex/ymaps3-types'
import { create } from 'zustand'
import { DEFAULT_CENTER, DEFAULT_DURATION, DEFAULT_ZOOM } from '../config/map.config'

interface MapStore {
	maplocation: {
		center: LngLat
		zoom: number
		duration: number
	}
	setMapLocation: (center: LngLat, zoom?: number, duration?: number) => void
}

export const useMapStore = create<MapStore>()((set) => ({
	maplocation: {
		center: DEFAULT_CENTER,
		zoom: DEFAULT_ZOOM,
		duration: DEFAULT_DURATION,
	},

	setMapLocation: (center, zoom = 14, duration = 500) => {
		set({
			maplocation: { center, zoom, duration },
		})
	},
}))
