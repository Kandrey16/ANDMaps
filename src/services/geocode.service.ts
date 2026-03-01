import axios from 'axios'

export async function geocode(input: string): Promise<[number, number] | null> {
	const url = 'https://geocode-maps.yandex.ru/1.x/'

	try {
		const res = await axios.get(url, {
			params: {
				apikey: import.meta.env.VITE_YANDEX_API_KEY,
				geocode: input,
				format: 'json',
			},
		})

		const point =
			res.data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point
				?.pos

		if (!point) return null

		const [lng, lat] = point.split(' ').map(Number)

		return [lng, lat] as [number, number]
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('OSRM error: ', error.response?.data)
		} else {
			console.error(error)
		}
		return null
	}
}
