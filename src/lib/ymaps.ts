import React from 'react'
import ReactDom from 'react-dom'

interface Ymaps3 {
	ready: Promise<void>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	import: (module: string) => Promise<any>
}

declare global {
	interface Window {
		ymaps3?: Ymaps3
	}
}

declare const ymaps3: Ymaps3

export const initYmaps = async () => {
	if (window.ymaps3) return // уже загружено

	const script = document.createElement('script')
	script.src = `https://api-maps.yandex.ru/v3/?apikey=${
		import.meta.env.VITE_YANDEX_MAPS_API_KEY
	}&lang=ru_RU`
	script.async = true
	document.head.appendChild(script)

	await new Promise<void>((resolve) => {
		script.onload = () => resolve()
		script.onerror = () => console.error('Yandex Maps load failed')
	})

	await ymaps3.ready // ждём готовности API
}

// использование
await initYmaps()

const [ymaps3React] = await Promise.all([
	ymaps3.import('@yandex/ymaps3-reactify'),
])

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom)
export const {
	YMap,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
	YMapMarker,
	YMapFeature,
} = reactify.module(ymaps3)
