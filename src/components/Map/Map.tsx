import {
	YMap,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
} from '../../lib/ymaps'
import { useMapStore } from '../../store/map.store'
import MapPoints from './MapPoints'

export default function Map() {
	const { maplocation } = useMapStore()
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
