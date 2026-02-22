import { create } from 'zustand'
import type { LngLat } from '@yandex/ymaps3-types'
import {
	RouteProfile,
	type GeoJSONString,
	type RouteLegs,
} from '../types/route.type'
import { createJSONStorage, persist } from 'zustand/middleware'
import { fetchRoute } from '../api/routing.service'
import {
	DEFAULT_CENTER,
	DEFAULT_DURATION,
	DEFAULT_ZOOM,
} from '../config/map.config'

interface RouteStore {
	draftPointA: LngLat | null
	draftPointB: LngLat | null

	lastInputA: string
	lastInputB: string

	historyPoints: string[]

	maplocation: {
		center: LngLat
		zoom: number
		duration: number
	}
	setMapLocation: (center: LngLat, zoom?: number, duration?: number) => void

	setDraftPointA: (point: LngLat) => void
	setDraftPointB: (point: LngLat) => void

	setLastInputA: (val: string) => void
	setLastInputB: (val: string) => void

	setHistoryPoints: (valA: string, valB: string) => void
	selectHistoryRoute: (item: string) => void
	removeHistoryRoute: (id: number) => void

	routes: RouteItem[]
	activeRouteId: string | null

	isLoading: boolean
	error: string | null

	activeRoute: () => RouteItem | null
	setLoading: (value: boolean) => void
	setError: (value: string | null) => void

	buildRoute: (pointA: LngLat, pointB: LngLat, profile: RouteProfile) => void
	addRoute: (route: RouteItem) => void
	setActiveRoute: (id: string) => void
	removeRoute: (id: string) => void
	clearRoutes: () => void
	clearHistory: () => void
}

export type RouteItem = {
	id: string
	profile: RouteProfile
	start: LngLat
	end: LngLat
	distance: number
	duration: number
	weight?: number
	weight_name?: string
	geometry: GeoJSONString
	legs: RouteLegs[]
	createdAt: number
}

export const useRouteStore = create<RouteStore>()(
	persist(
		(set, get) => ({
			draftPointA: null,
			draftPointB: null,

			lastInputA: '',
			lastInputB: '',

			historyPoints: [],

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

			setDraftPointA: (point) => set({ draftPointA: point }),
			setDraftPointB: (point) => set({ draftPointB: point }),

			setLastInputA: (val) => set({ lastInputA: val }),
			setLastInputB: (val) => set({ lastInputB: val }),

			routes: [],
			activeRouteId: null,
			isLoading: false,
			error: null,

			activeRoute: () => {
				const { routes, activeRouteId } = get()
				return routes.find((r) => r.id === activeRouteId) ?? null
			},
			setLoading: (value) => set({ isLoading: value }),
			setError: (message) => set({ error: message }),

			buildRoute: async (pointA, pointB, profile) => {
				if (!pointA || !pointB) {
					set({ error: 'Points are not found' })
					return
				}

				try {
					set({ isLoading: true, error: null })
					get().clearRoutes()

					const result = await fetchRoute(pointA, pointB, profile)

					if (!result) {
						set({ error: 'Route is not found' })
						return
					}

					const queryId = crypto.randomUUID()

					//здесь данные записывается из сервиса
					const newRoutes = result.map((r, idx) => ({
						id: idx === 0 ? queryId : `${queryId} - ${idx}`,
						profile: profile,
						start: pointA,
						end: pointB,
						geometry: r.geometry,
						distance: r.distance,
						duration: r.duration,
						legs: r.legs,
						createdAt: Date.now(),
					}))

					newRoutes.forEach((r) => {
						get().addRoute(r)
					})
				} catch (error) {
					set({ error: 'Routing loading failed' })
				} finally {
					set({ isLoading: false })
				}
			},

			addRoute: (route) => {
				set((state) => ({
					routes: [...state.routes, route],
					activeRouteId: route.id,
				}))
			},

			setActiveRoute: (id) => {
				set({ activeRouteId: id })
			},

			removeRoute: (id) => {
				set((state) => ({
					routes: state.routes.filter((r) => r.id !== id),
				}))
			},

			removeHistoryRoute: (id: number) => {
				set((state) => ({
					historyPoints: state.historyPoints.filter((_, i) => i !== id),
				}))
			},

			clearRoutes: () => {
				set({
					routes: [],
					activeRouteId: null,
				})
			},

			setHistoryPoints: (valA: string, valB: string) => {
				if (!valA.trim() || !valB.trim()) return

				const combined = `${valA.trim()} - ${valB.trim()}`

				set((state) => ({
					historyPoints: [
						combined,
						...state.historyPoints.filter((item) => item !== combined),
					].slice(0, 10),
				}))
			},

			selectHistoryRoute: (item) => {
				const [pointA, pointB] = item.split(' - ')
				console.log('Выбрано из истории:', pointA, pointB)
				get().setLastInputA(pointA)
				get().setLastInputB(pointB)
			},

			clearHistory: () => {
				set({
					historyPoints: [],
				})
			},
		}),
		{
			name: 'route-storage',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				draftPointA: state.draftPointA,
				draftPointB: state.draftPointB,
				lastInputA: state.lastInputA,
				lastInputB: state.lastInputB,
				historyPoints: state.historyPoints,
				activeRouteId: state.activeRouteId,
			}),
		}
	)
)
