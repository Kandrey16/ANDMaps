export type Route = {
	geometry: GeoJSONString
	distance: number // в метрах
	duration: number // в секундах
	weight: number
	weight_name: string
	legs: RouteLegs[]
}

export type GeoJSONString = {
	type: 'LineString'
	coordinates: [number, number][]
}

export enum RouteProfile {
	DRIVING = 'driving',
	WALKING = 'walking',
	CYCLING = 'cycling',
}

export type OSRMResponse = {
	routes: Route[]
}

export type RouteLegs = {
	summary: string
	distance: number
	duration: number
	steps: {
		maneuver: {
			instruction: string // ← самый полезный текст
			type: string
			modifier?: string
			location: [number, number]
		}
		name: string
		ref?: string
		distance: number
		duration: number
	}[]
}

