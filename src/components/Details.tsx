import { RouteInfoSection } from './RouteInfoSection'
import { RoutesList } from './RoutesList'
import { RoutesHistory } from './RoutesHistory'

export const Details = () => {
	return (
		<div className='py-4 space-y-4'>
			<RoutesList />
			<RouteInfoSection />
			<RoutesHistory />
		</div>
	)
}
