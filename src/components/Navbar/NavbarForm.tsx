import { useRouteStore } from '../../store/route.store'
import marker_start from '../../assets/marker_start.svg'
import marker_finish from '../../assets/marker_finish.svg'
import { CircleQuestionMark, Route } from 'lucide-react'
import { useState } from 'react'
import { Answer } from '../common/Answer'
import { motion } from 'framer-motion'
import { AnswerVariant } from '../../types/answers'
import { useRouteSubmit } from '../../hooks/useRouteSubmit'
import { useRouteForm } from '../../hooks/useRouteForm'

export const NavbarForm = () => {
	const { buildRoute } = useRouteStore()
	const { submit, isLoading } = useRouteSubmit()
	const { form, getPosition, getCompanyLocation, clearValues } = useRouteForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form
	const [openA, setOpenA] = useState(false)
	const [openB, setOpenB] = useState(false)

	return (
		<form onSubmit={handleSubmit(submit)} className='flex flex-col gap-2'>
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
							onClick={() => getCompanyLocation()}
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
