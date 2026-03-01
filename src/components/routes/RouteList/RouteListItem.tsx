import clsx from 'clsx'

type Profile = 'driving' | 'walking' | 'cycling'

const PROFILE_CONFIG: Record<Profile, { icon: string; label: string }> = {
	driving: { icon: '🚗', label: 'На автомобиле' },
	walking: { icon: '🚶', label: 'Пешком' },
	cycling: { icon: '🚲', label: 'На велосипеде' },
}

function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.round((seconds % 3600) / 60)
	return hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`
}

type RouteListItemProps = {
	profile: Profile
	distance: number
	duration: number
	isActive: boolean
	onClick: () => void
}

export const RouteListItem = ({
	profile,
	distance,
	duration,
	isActive,
	onClick,
}: RouteListItemProps) => {
	const config = PROFILE_CONFIG[profile] ?? {
		icon: '❓',
		label: 'Неизвестно',
	}

	return (
		<div
			className={clsx(
				'p-3 rounded cursor-pointer transition-colors',
				isActive
					? 'bg-[--bg-secondary] border-l-4 border-(--accent)'
					: 'hover:bg-(--bg-secondary)/50'
			)}
			onClick={onClick}
		>
			<div className='flex justify-between items-center gap-3'>
				<div className='flex items-center gap-3'>
					<span className='text-2xl'>{config.icon}</span>

					<div>
						<div className='font-medium'>{config.label}</div>
						<div className='text-sm text-(--text-secondary)'>
							{(distance / 1000).toFixed(1)} км
						</div>
					</div>
				</div>

				<div className='text-xl font-medium'>{formatDuration(duration)}</div>
			</div>
		</div>
	)
}
