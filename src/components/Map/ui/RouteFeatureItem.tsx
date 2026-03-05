import { DEFAULT_CAR_ANIMATION_DURATION } from '../../../config/map.config'
import { YMapFeature } from '../../../lib/ymaps'
import { getIconByProfile } from '../../../utils/getIconByProfile'
import { AnimatedObject } from '../../ui/AnimatedObject'

type RouteFeatureItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any
  isActive: boolean
}

export const RouteFeatureItem = ({ route, isActive }: RouteFeatureItemProps) => {
  return (
    <>
      <YMapFeature
        geometry={route.geometry}
        style={{
          stroke: [
            {
              width: isActive ? 8 : 5,
              color: isActive ? '#00f068' : '#9ca3af',
            },
            { width: 10, color: '#000000', opacity: 0.25 },
          ],
          zIndex: isActive ? 10 : 1,
        }}
      />

      {isActive && (
        <AnimatedObject
          key={route.id}
          coordinates={route.geometry.coordinates}
          duration={DEFAULT_CAR_ANIMATION_DURATION}
          img={getIconByProfile(route.profile)}
        />
      )}
    </>
  )
}
