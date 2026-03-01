type RoutesHistoryButtonProps = {
	onClear: () => void
}

export const RoutesHistoryButton = ({ onClear }: RoutesHistoryButtonProps) => {
	return (
		<button
			onClick={onClear}
			className='w-full mt-2 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg text-sm font-medium transition-colors'
		>
			Очистить историю
		</button>
	)
}
