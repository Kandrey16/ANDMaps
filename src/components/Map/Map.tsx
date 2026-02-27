import {
	YMap,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
} from '../../lib/ymaps'
import { useRouteStore } from '../../store/route.store'
import MapPoints from './MapPoints'

export default function Map() {
	const { maplocation } = useRouteStore()
	return (
		<div className='w-full h-full'>
			<YMap location={maplocation}>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				<MapPoints />
			</YMap>
		</div>
	)
}
