import { useForm } from 'react-hook-form'
import { useRouteStore } from '../store/route.store'
import { RouteProfile } from '../types/route.type'
import { parseCoordinates } from '../utils/parseCoordinates'
import { geocode } from '../api/geocode.service'
import type { LngLat } from '@yandex/ymaps3-types'
import { detectInputType } from '../utils/detectInputType'
import marker_start from '../assets/marker_start.svg'
import marker_finish from '../assets/marker_finish.svg'
import { CircleQuestionMark, Route } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Answer, AnswerVariant } from './Answer'
import { motion } from 'framer-motion'
import { getCurrentPosition } from '../utils/getCurrentPosition'

type FormData = {
	pointA: string
	pointB: string
}
export const NavbarForm = () => {
	const {
		lastInputA,
		lastInputB,
		setDraftPointA,
		setDraftPointB,
		setLastInputA,
		setLastInputB,
		setHistoryPoints,
		buildRoute,
		isLoading,
		setError,
	} = useRouteStore()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			pointA: lastInputA,
			pointB: lastInputB,
		},
		mode: 'onChange',
	})
	const [openA, setOpenA] = useState(false)
	const [openB, setOpenB] = useState(false)

	useEffect(() => {
		setValue('pointA', lastInputA)
	}, [lastInputA])

	useEffect(() => {
		setValue('pointB', lastInputB)
	}, [lastInputB])

	const getPosition = async () => {
		const coordsString = await getCurrentPosition()
		if (coordsString) {
			setValue('pointA', coordsString)
		}
	}

	function getCompanyLocation(input: string) {
		setValue('pointB', input)
	}

	function clearValues() {
		setValue('pointA', '')
		setValue('pointB', '')
	}

	const onSubmit = async (data: FormData) => {
		const inputA = data.pointA.trim()
		const inputB = data.pointB.trim()

		let pointA: LngLat | null = null
		let pointB: LngLat | null = null

		if (detectInputType(inputA) === 'coordinates') {
			pointA = parseCoordinates(inputA)
		} else {
			setLastInputA(inputA)
			pointA = await geocode(inputA)
		}
		if (detectInputType(inputB) === 'coordinates') {
			pointB = parseCoordinates(inputB)
		} else {
			setLastInputB(inputB)
			pointB = await geocode(inputB)
		}

		if (!pointA || !pointB) {
			setError('Ничего не найдено')
			return
		}

		setDraftPointA(pointA)
		setDraftPointB(pointB)
		setHistoryPoints(inputA, inputB)

		Object.values(RouteProfile).forEach((profile) => {
			buildRoute(pointA, pointB, profile)
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
			<div className='relative suggest-container'>
				<div className='flex flex-row w-full items-center gap-2'>
					<div className='flex flex-1 items-center border rounded-lg px-4 py-2'>
						<img
							src={marker_start}
							className='h-5 w-5 cursor-pointer'
							onClick={getPosition}
						/>
						<input
							{...register('pointA', {
								required: 'Обязательное поле',
								validate: (value) =>
									!!value.trim() || 'Введите адрес или координаты',
							})}
							placeholder='Откуда'
							className='flex-1 ml-2 bg-transparent outline-none'
						/>
					</div>

					<CircleQuestionMark onClick={() => setOpenA(!openA)} />
				</div>
				{errors.pointA && (
					<p className='text-red-500 text-sm'>{errors.pointA.message}</p>
				)}
				{openA && <Answer isOpen={true} variant={AnswerVariant.A} />}
			</div>

			<div className='relative suggest-container'>
				<div className='flex flex-row w-full items-center gap-2'>
					<div className='flex flex-1 items-center border rounded-lg px-4 py-2'>
						<img
							src={marker_finish}
							className='h-5 w-5 cursor-pointer'
							onClick={() =>
								getCompanyLocation(
									'г. Москва, ВН.ТЕР.Г. Муниципальный округ Бутырский, ул. Новодмитровская, д.2Б'
								)
							}
						/>
						<input
							{...register('pointB', {
								required: 'Обязательное поле',
								validate: (value) =>
									!!value.trim() || 'Введите адрес или координаты',
							})}
							placeholder='Куда'
							className='flex-1 ml-2 bg-transparent outline-none'
						/>
					</div>

					<CircleQuestionMark onClick={() => setOpenB(!openB)} />
				</div>

				{errors.pointB && (
					<p className='text-red-500 text-sm'>{errors.pointB.message}</p>
				)}
				{openB && <Answer isOpen={true} variant={AnswerVariant.B} />}
			</div>

			<div
				className='flex justify-end w-full px-2'
				onClick={() => clearValues()}
			>
				<p className='hover:text-white'>Сбросить</p>
			</div>

			<button
				type='submit'
				onClick={() => buildRoute}
				disabled={isLoading}
				className='w-full bg-blue-600 text-white px-4 py-2 rounded'
			>
				<motion.div
					whileHover={{ scale: 1.1 }}
					transition={{ type: 'spring', stiffness: 400, damping: 20 }}
					className='flex flex-row justify-center items-center gap-2'
				>
					{isLoading ? 'Строим маршрут...' : 'Построить маршрут'}
					<Route size={18} />
				</motion.div>
			</button>
		</form>
	)
}
