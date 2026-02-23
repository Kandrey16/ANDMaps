import { YMapMarker, YMapFeature } from '../lib/ymaps'
import { useRouteStore } from '../store/route.store'
import marker_start from '../assets/marker_start.svg'
import marker_finish from '../assets/marker_finish.svg'
import { AnimatedObject } from './AnimatedObject'
import { DEFAULT_CAR_ANIMATION_DURATION } from '../config/map.config'
import { getIconByProfile } from '../utils/getIconByProfile'

export default function MapPoints() {
	const { draftPointA, draftPointB, routes, activeRouteId } = useRouteStore()
	console.log('routes', routes)

	return (
		<>
			{draftPointA && (
				<YMapMarker coordinates={draftPointA}>
					<div style={{ width: 30, height: 30 }}>
						<img
							src={marker_start}
							style={{ width: '100%', height: '100%' }}
							alt='Start'
						/>
					</div>
				</YMapMarker>
			)}

			{draftPointB && (
				<YMapMarker coordinates={draftPointB}>
					<div style={{ width: 30, height: 30 }}>
						<img
							src={marker_finish}
							style={{ width: '100%', height: '100%' }}
							alt='Finish'
						/>
					</div>
				</YMapMarker>
			)}

			{routes &&
				routes.map((cur) => {
					const isActive = cur.id === activeRouteId
					return (
						<div key={cur.id}>
							<YMapFeature
								geometry={cur.geometry}
								style={{
									stroke: [
										{
											width: cur.id === activeRouteId ? 8 : 5,
											color: cur.id === activeRouteId ? '#00f068' : '#9ca3af',
										},
										{ width: 10, color: '#000000', opacity: 0.25 },
									],
									zIndex: cur.id === activeRouteId ? 10 : 1,
								}}
							/>
							{isActive && (
								<AnimatedObject
									key={activeRouteId}
									coordinates={cur.geometry.coordinates}
									duration={DEFAULT_CAR_ANIMATION_DURATION}
									img={getIconByProfile(cur.profile)}
								/>
							)}
						</div>
					)
				})}
		</>
	)
}
