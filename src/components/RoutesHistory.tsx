// HistoryRoutes.tsx
import { useRouteStore } from '../store/route.store'
import { useState } from 'react'
import { ChevronsDown, ChevronsUp, History, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export const RoutesHistory = () => {
	const {
		clearHistory,
		historyPoints,
		removeHistoryRoute,
		selectHistoryRoute,
	} = useRouteStore()
	const [open, setOpen] = useState(false)

	if (!historyPoints?.length) return null

	return (
		<div className='flex flex-col py-2 gap-2'>
			<button
				className='flex justify-between items-center w-full text-xl font-medium'
				onClick={() => setOpen(!open)}
			>
				<div className='flex flex-row items-center gap-1'>
					<History size={18} />
					<span>История маршрутов</span>
				</div>

				{open ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
						className='overflow-hidden px-2'
					>
						<div className='space-y-2 pb-3'>
							{historyPoints.map((his, i) => (
								<div
									key={i}
									className='flex items-center justify-between px-3 py-2.5 bg-gray-900/50 hover:bg-gray-900 rounded-lg cursor-pointer transition-colors group'
									onClick={() => selectHistoryRoute(his)}
								>
									<span className='text-sm text-gray-200 truncate flex-1 pr-2'>
										{his}
									</span>
									<X
										size={16}
										className='text-gray-500 hover:text-red-400 opacity-70 group-hover:opacity-100 transition-opacity shrink-0'
										onClick={(e) => {
											e.stopPropagation()
											removeHistoryRoute(i)
										}}
									/>
								</div>
							))}
						</div>

						<button
							onClick={clearHistory}
							className='w-full mt-2 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-sm font-medium transition-colors'
						>
							Очистить историю
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
