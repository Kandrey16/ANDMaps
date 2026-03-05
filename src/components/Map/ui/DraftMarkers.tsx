import marker_finish from '../../../assets/marker_finish.svg'
import marker_start from '../../../assets/marker_start.svg'
import { YMapMarker } from '../../../lib/ymaps'
import { useSearchStore } from '../../../store/search.store'
import { MarkerIcon } from './MarkerIcon'

export const DraftMarkers = () => {
  const { draftPointA, draftPointB } = useSearchStore()

  return (
    <>
      {draftPointA && (
        <YMapMarker coordinates={draftPointA}>
          <MarkerIcon src={marker_start} alt="Start" />
        </YMapMarker>
      )}

      {draftPointB && (
        <YMapMarker coordinates={draftPointB}>
          <MarkerIcon src={marker_finish} alt="Finish" />
        </YMapMarker>
      )}
    </>
  )
}
