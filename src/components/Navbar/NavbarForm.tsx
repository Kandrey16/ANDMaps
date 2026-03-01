import marker_start from '../../assets/marker_start.svg'
import marker_finish from '../../assets/marker_finish.svg'
import { AnswerVariant } from '../../types/answers'
import { useRouteSubmit } from '../../hooks/useRouteSubmit'
import { useRouteForm } from '../../hooks/useRouteForm'
import { RouteInputField } from './RouteInputField'
import { RouteSubmitButton } from './RouteSubmitButton'

export const NavbarForm = () => {
	const { submit, isLoading } = useRouteSubmit()
	const { form, getPosition, getCompanyLocation, clearValues } = useRouteForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	return (
		<form onSubmit={handleSubmit(submit)} className='flex flex-col gap-2'>
			<RouteInputField
				icon={marker_start}
				placeholder='Откуда'
				register={register('pointA', {
					required: 'Обязательное поле',
					validate: (v) => !!v.trim() || 'Введите адрес или координаты',
				})}
				error={errors.pointA}
				onIconClick={getPosition}
				answerVariant={AnswerVariant.A}
			/>
			<RouteInputField
				icon={marker_finish}
				placeholder='Куда'
				register={register('pointB', {
					required: 'Обязательное поле',
					validate: (v) => !!v.trim() || 'Введите адрес или координаты',
				})}
				error={errors.pointB}
				onIconClick={getCompanyLocation}
				answerVariant={AnswerVariant.B}
			/>

			<div
				className='flex justify-end w-full px-2'
				onClick={() => clearValues()}
			>
				<p className='hover:text-white'>Сбросить</p>
			</div>

			<RouteSubmitButton isLoading={isLoading} />
		</form>
	)
}
