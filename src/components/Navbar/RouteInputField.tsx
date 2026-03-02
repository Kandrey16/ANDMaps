import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import type { AnswerVariant } from '../../types/answers'
import { useState } from 'react'
import { Answer } from '../ui/Answer'
import { CircleQuestionMark } from 'lucide-react'

type RouteInputFieldProps = {
	icon: string
	placeholder: string
	register: UseFormRegisterReturn
	error?: FieldError
	onIconClick: () => void
	answerVariant: AnswerVariant
}

export const RouteInputField = ({
	icon,
	placeholder,
	register,
	error,
	onIconClick,
	answerVariant,
}: RouteInputFieldProps) => {
	const [open, setOpen] = useState(false)

	return (
		<div className='relative suggest-container'>
			<div className='flex flex-row w-full items-center gap-2'>
				<div className='flex flex-1 items-center border rounded-lg px-4 py-2'>
					<img
						src={icon}
						className='h-5 w-5 cursor-pointer'
						onClick={onIconClick}
					/>
					<input
						{...register}
						placeholder={placeholder}
						className='flex-1 ml-2 bg-transparent outline-none'
					/>
				</div>

				<CircleQuestionMark onClick={() => setOpen(!open)} />
			</div>

			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
			{open && <Answer isOpen={true} variant={answerVariant} />}
		</div>
	)
}
