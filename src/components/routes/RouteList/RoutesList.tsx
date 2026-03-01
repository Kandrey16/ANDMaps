// RoutesList.tsx
import { useRouteStore } from '../../../store/route.store'
import { RouteListItem } from './RouteListItem'

export const RoutesList = () => {
	const { routes, activeRouteId, setActiveRoute } = useRouteStore()

	return (
		<div className='space-y-2 rounded-xl shadow-lg'>
			{routes.map((route) => (
				<RouteListItem
					key={route.id}
					profile={route.profile}
					distance={route.distance}
					duration={route.duration}
					isActive={route.id === activeRouteId}
					onClick={() => setActiveRoute(route.id)}
				/>
			))}
		</div>
	)
}
