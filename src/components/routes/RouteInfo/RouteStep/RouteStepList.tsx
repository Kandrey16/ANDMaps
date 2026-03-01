import { useState } from 'react'
import { useMapStore } from '../../../../store/map.store'
import { RouteStepItem } from './RouteStepItem'
import type { RouteLegs } from '../../../../types/route.type'

type RouteStepsListProps = {
	steps: RouteLegs['steps']
}

export const RouteStepsList = ({ steps }: RouteStepsListProps) => {
	const { setMapLocation } = useMapStore()
	const [active, setActive] = useState(0)

	return (
		<div className='text-xs space-y-1 pr-1'>
			{steps.map((step, i) => (
				<RouteStepItem
					key={i}
					index={i}
					step={step}
					isActive={i === active}
					onClick={() => {
						if (step.maneuver?.location) {
							setMapLocation(step.maneuver.location, 16)
							setActive(i)
						}
					}}
				/>
			))}
		</div>
	)
}
