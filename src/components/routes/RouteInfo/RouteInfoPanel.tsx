import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type RouteInfoPanelProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export const RouteInfoPanel = ({
	isOpen,
	onClose,
	children,
}: RouteInfoPanelProps) => {
	return (
		<div className='mt-4'>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
						className='overflow-hidden mt-2'
					>
						<div className='rounded-lg p-3 bg-[--panel-bg]'>
							<div className='flex justify-between items-center mb-3'>
								<span className='font-medium'>Маршрут:</span>
								<X className='cursor-pointer' onClick={onClose} />
							</div>
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
