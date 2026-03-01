import { motion } from 'framer-motion'
import { Route } from 'lucide-react'

type RouteSubmitButtonProps = {
	isLoading: boolean
}

export const RouteSubmitButton = ({ isLoading }: RouteSubmitButtonProps) => {
	return (
		<button
			type='submit'
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
	)
}
