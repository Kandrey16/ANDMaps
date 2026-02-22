import { motion } from 'framer-motion'

export enum AnswerVariant {
	A = 'Нажмите на маркер, чтобы определить свое местоположение',
	B = 'Нажмите на маркер, чтобы выбрать место работы',
}

type AnswerProps = {
	variant: AnswerVariant
	isOpen: boolean
}

export const Answer = ({ variant, isOpen }: AnswerProps) => {
	if (!isOpen) return null

	return (
		<motion.p
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			className='text-xs'
		>
			{variant}
		</motion.p>
	)
}
