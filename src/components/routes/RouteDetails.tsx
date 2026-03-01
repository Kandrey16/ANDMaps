import { RouteInfoSection } from './RouteInfo/RouteInfoSection'
import { RoutesList } from './RouteList/RoutesList'
import { RoutesHistory } from './RoutesHistory/RoutesHistory'

export const RouteDetails = () => {
	return (
		<div className='py-4 space-y-4'>
			<RoutesList />
			<RouteInfoSection />
			<RoutesHistory />
		</div>
	)
}
