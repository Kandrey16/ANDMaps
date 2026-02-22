import { getCurrentPositionByIP, getGPSPosition } from '../api/location.service'

export async function getCurrentPosition() {
	let coords = await getGPSPosition()

	if (!coords) {
		coords = await getCurrentPositionByIP()
	}

	if (coords) {
		return `${coords.lat}, ${coords.lon}`
	}
	
	alert('Не удалось определить ваше местоположение')
	return undefined
}
