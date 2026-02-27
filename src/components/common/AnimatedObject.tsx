import { useEffect, useRef, useState, useMemo } from 'react'
import { YMapMarker } from '../../lib/ymaps'
import type { LngLat } from '@yandex/ymaps3-types'

type AnimatedCarProps = {
	coordinates: LngLat[]
	duration: number
	img: string
}
//Вычисление расстояния между между двумя точками
function distance(a: LngLat, b: LngLat) {
	const dx = b[0] - a[0] //по lng
	const dy = b[1] - a[1] //по lat
	return Math.sqrt(dx * dx + dy * dy)
}

export const AnimatedObject = ({
	coordinates,
	duration,
	img,
}: AnimatedCarProps) => {
	//текущее положение машины
	const [position, setPosition] = useState<LngLat | null>(coordinates[0])
	//хранит id requestAnimationFrame
	const animationRef = useRef<number | null>(null)
	//хранит timestamp старта анимации
	const startRef = useRef<number | null>(null)
	//useRef используется для сохранения результатов анимации между рендерами компонента

	//Предварительный расчёт длины маршрута
	//useMemo кэширует вычисления при выполнении анимации, чтобы не пересчитывать их при каждом рендере
	const routeMeta = useMemo(() => {
		if (coordinates.length < 2) return null

		const segments = [] //сегменты маршрута
		let total = 0 //общая длина маршрута

		//Выичсление по всем точкам маршрута
		for (let i = 0; i < coordinates.length - 1; i++) {
			//длина сегмента
			const len = distance(coordinates[i], coordinates[i + 1])

			//Конечный объект сегмента
			segments.push({
				start: coordinates[i],
				end: coordinates[i + 1],
				length: len,
			})
			total += len
		}

		return { segments, total }
	}, [coordinates])

	useEffect(() => {
		if (!routeMeta) return

		//стартовое время
		startRef.current = null

		//анимация передвижения
		const animate = (timestamp: number) => {
			//фикс начала анимации
			if (startRef.current === null) {
				startRef.current = timestamp
			}

			//время анимации и прогресс от 0 до 1
			const elapsed = timestamp - startRef.current
			const rawProgress = elapsed / duration

			//ограничение прогресса
			//делает анимацию плавной
			const progress = Math.min(rawProgress, 1)
			const eased = progress * progress * (3 - 2 * progress)

			//общая дистанция, которую должна пройти машина
			const targetDistance = routeMeta.total * eased

			let accumulated = 0

			//Проходит по всем этапам маршрута
			for (const seg of routeMeta.segments) {
				if (accumulated + seg.length >= targetDistance) {
					const localProgress = (targetDistance - accumulated) / seg.length

					const lng = seg.start[0] + (seg.end[0] - seg.start[0]) * localProgress

					const lat = seg.start[1] + (seg.end[1] - seg.start[1]) * localProgress

					//Обновление положения машинки
					setPosition([lng, lat])
					break
				}

				//по прохождении этапа, увеличивает пройденную длину
				accumulated += seg.length
			}

			//пока анимация не закончилась, просит следующий кадр
			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate)
			}
		}

		//запускает самый первый кадр
		animationRef.current = requestAnimationFrame(animate)

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [routeMeta, duration, coordinates])

	if (!position) return null

	return (
		<YMapMarker coordinates={position}>
			<div
				style={{
					width: 30,
					height: 30,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img
					src={img}
					alt='car'
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'contain',
					}}
				/>
			</div>
		</YMapMarker>
	)
}
