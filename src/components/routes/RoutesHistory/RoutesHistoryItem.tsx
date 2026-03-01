import { X } from 'lucide-react'

type RoutesHistoryItemProps = {
	value: string
	index: number
	onSelect: () => void
	onRemove: () => void
}

export const RoutesHistoryItem = ({
	value,
	index,
	onSelect,
	onRemove,
}: RoutesHistoryItemProps) => {
	return (
		<div
			key={index}
			className='flex items-center justify-between px-3 py-2.5 bg-[--bg-secondary] hover:[--bg-secondary] rounded-lg cursor-pointer transition-colors group'
			onClick={onSelect}
		>
			<span className='text-sm truncate flex-1 pr-2'>{value}</span>
			<X
				size={16}
				className='text-gray-500 hover:text-red-400 opacity-70 group-hover:opacity-100 transition-opacity shrink-0'
				onClick={(e) => {
					e.stopPropagation()
					onRemove()
				}}
			/>
		</div>
	)
}
