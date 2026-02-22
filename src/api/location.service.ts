export async function getCurrentPositionByIP(): Promise<{
	lat: number
	lon: number
} | null> {
	try {
		const response = await fetch(
			'http://ip-api.com/json/?fields=status,lat,lon,message'
		)
		const data = await response.json()
		if (data.status === 'success') {
			console.log({ lat: data.lat, lon: data.lon })

			return { lat: data.lat, lon: data.lon }
		} else {
			console.warn('IP Geolocation failed:', data.message)
			return null
		}
	} catch (error) {
		console.error('IP Geolocation error:', error)
		return null
	}
}

export function getGPSPosition(): Promise<{ lat: number; lon: number } | null> {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			resolve(null)
			return
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude })
			},
			(err) => {
				console.warn('GPS ошибка:', err.message)
				resolve(null)
			},
			{
				enableHighAccuracy: true, // требуем высокой точности
				timeout: 10000, // ждём до 10 секунд
				maximumAge: 0,
			}
		)
	})
}
