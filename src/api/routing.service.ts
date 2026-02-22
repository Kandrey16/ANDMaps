import type { LngLat } from '@yandex/ymaps3-types'
import axios from 'axios'
import type { OSRMResponse, RouteProfile, Route } from '../types/route.type'

export async function fetchRoute(
	start: LngLat,
	end: LngLat,
	profile: RouteProfile
): Promise<Route[] | null> {
	const url = `https://router.project-osrm.org/route/v1/${profile}/${start.join(
		','
	)};${end.join(',')}`

	try {
		const res = await axios.get<OSRMResponse>(url, {
			params: {
				overview: 'full',
				geometries: 'geojson',
				steps: true,
				annotations: true,
				alternatives: true,
			},
		})

		const routes = res.data.routes

		if (!routes.length) return null

		return routes
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('OSRM error: ', error.response?.data)
		} else {
			console.error(error)
		}
		return null
	}
}
