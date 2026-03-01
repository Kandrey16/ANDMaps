import { create } from 'zustand'
import type { LngLat } from '@yandex/ymaps3-types'
import {
	RouteProfile,
	type GeoJSONString,
	type RouteLegs,
} from '../types/route.type'
import { createJSONStorage, persist } from 'zustand/middleware'
import { fetchRoute } from '../services/routing.service'

interface RouteStore {
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
				get().clearRoutes()

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

					newRoutes.sort((a, b) => a.duration - b.duration)

					newRoutes.forEach((r) => {
						get().addRoute(r)
					})
				} catch {
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

			clearRoutes: () => {
				set({
					routes: [],
					activeRouteId: null,
				})
			},
		}),
		{
			name: 'route-storage',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				activeRouteId: state.activeRouteId,
			}),
		}
	)
)
