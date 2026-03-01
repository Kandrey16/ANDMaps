import { useState } from 'react'
import { ChevronsDown, ChevronsUp, History } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchStore } from '../../../store/search.store'
import { RoutesHistoryList } from './RoutesHistoryList'
import { RoutesHistoryButton } from './RoutesHistoryButton'

export const RoutesHistory = () => {
	const {
		clearHistory,
		historyPoints,
		removeHistoryRoute,
		selectHistoryRoute,
	} = useSearchStore()
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
						<RoutesHistoryList
							items={historyPoints}
							onSelect={selectHistoryRoute}
							onRemove={removeHistoryRoute}
						/>

						<RoutesHistoryButton onClear={clearHistory} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
