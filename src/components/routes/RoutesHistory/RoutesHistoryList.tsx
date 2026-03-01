import { RoutesHistoryItem } from './RoutesHistoryItem'

type RoutesHistoryListProps = {
	items: string[]
	onSelect: (value: string) => void
	onRemove: (index: number) => void
}

export const RoutesHistoryList = ({
	items,
	onSelect,
	onRemove,
}: RoutesHistoryListProps) => {
	return (
		<div className='space-y-2 pb-3'>
			{items.map((item, i) => (
				<RoutesHistoryItem
					key={i}
					value={item}
					index={i}
					onSelect={() => onSelect(item)}
					onRemove={() => onRemove(i)}
				/>
			))}
		</div>
	)
}
