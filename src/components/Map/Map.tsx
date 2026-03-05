import { YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } from '../../lib/ymaps'
import { useMapStore } from '../../store/map.store'
import MapPoints from './MapPoints'

export default function Map() {
  const { maplocation } = useMapStore()

  return (
    <div className="h-full w-full">
      <YMap location={maplocation}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <MapPoints />
      </YMap>
    </div>
  )
}
