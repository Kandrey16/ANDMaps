import { useRouteStore } from '../../../store/route.store'
import { RouteFeatureItem } from './RouteFeatureItem'

export const RoutesFeatures = () => {
  const { routes, activeRouteId } = useRouteStore()

  return (
    <>
      {routes.map(route => (
        <RouteFeatureItem key={route.id} route={route} isActive={route.id === activeRouteId} />
      ))}
    </>
  )
}
