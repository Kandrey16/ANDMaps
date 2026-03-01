import type { RouteLegs } from '../../../types/route.type'
import { RouteInfoPanel } from './RouteInfoPanel'
import { RouteStepsList } from './RouteStep/RouteStepList'

type RouteInfoProps = {
	data: RouteLegs | null
	isOpen: boolean
	onClose: () => void
}

export const RouteInfo = ({ data, isOpen, onClose }: RouteInfoProps) => {
	return (
		<div className='mt-4'>
			<RouteInfoPanel isOpen={isOpen} onClose={onClose}>
				{data && <RouteStepsList steps={data?.steps} />}
			</RouteInfoPanel>
		</div>
	)
}
