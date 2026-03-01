import clsx from 'clsx'
import type { RouteLegs } from '../../../../types/route.type'

type RouteStepItemProps = {
	index: number
	isActive: boolean
	step: RouteLegs['steps'][number]
	onClick: () => void
}

export const RouteStepItem = ({
	index,
	isActive,
	step,
	onClick,
}: RouteStepItemProps) => {
	return (
		<div
			className={clsx(
				'flex gap-2 px-3 py-2 cursor-pointer rounded-lg transition-colors',
				isActive
					? 'bg-[--bg-secondary] text-[--text-primary]'
					: 'hover:bg-[--bg-secondary]/70 text-[--text-secondary]'
			)}
			onClick={onClick}
		>
			<span className='w-5 shrink-0'>{index + 1}.</span>

			<div className='flex-1'>
				<span className='font-medium'>
					{step.maneuver?.instruction || 'Двигайтесь прямо'}
				</span>

				{step.name && <span> по {step.name}</span>}
				{step.ref && <span> ({step.ref})</span>}

				<span className='ml-2'>→ {(step.distance / 1000).toFixed(1)} км</span>
			</div>
		</div>
	)
}
