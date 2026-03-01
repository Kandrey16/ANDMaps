import axios from 'axios'

export async function fetchSuggest(query: string) {
	if (!query.trim() || query.length < 2) return []
	const url = 'https://suggest-maps.yandex.ru/v1/suggest'

	try {
		const res = await axios.get(url, {
			params: {
				apikey: import.meta.env.VITE_YANDEX_GEOSUGGEST_KEY,
				text: query,
				lang: 'ru_RU',
				types: 'biz,geo',
				results: 8,
			},
		})

		return res.data.results || []
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Suggest error: ', error.response?.data)
		} else {
			console.error(error)
		}
		return []
	}
}
