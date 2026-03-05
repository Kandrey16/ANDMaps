import axios from 'axios'

import type { YandexGeocodeResponse } from '../types/geocodeResponce.type'
import { parseCoordinates } from '../utils/parseCoordinates'

const GEOCODE_URL = 'https://geocode-maps.yandex.ru/1.x/'

export async function geocode(input: string): Promise<[number, number] | null> {
  try {
    const res = await axios.get(GEOCODE_URL, {
      params: {
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        geocode: input,
        format: 'json',
      },
    })

    const point = res.data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos

    if (!point) return null

    const [lng, lat] = point.split(' ').map(Number)

    return [lng, lat] as [number, number]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('OSRM error: ', error.response?.data)
    } else {
      console.error(error)
    }
    return null
  }
}

export async function reverseGeocode(input: string): Promise<string | null> {
  const coords = parseCoordinates(input)

  if (!coords) {
    throw new Error('Invalid coordinates format')
  }
  const [lng, lat] = coords

  try {
    const response = await axios.get<YandexGeocodeResponse>(GEOCODE_URL, {
      params: {
        apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
        geocode: `${lng},${lat}`, // ВАЖНО: Yandex ожидает lng,lat
        format: 'json',
        kind: 'house', // максимально точный уровень
        results: 1,
      },
    })

    const geoObject = response.data.response.GeoObjectCollection.featureMember[0]?.GeoObject
    if (!geoObject) return null

    const components = geoObject.metaDataProperty.GeocoderMetaData.Address.Components

    const getComponent = (kind: string) => components.find(c => c.kind === kind)?.name

    const city =
      getComponent('locality') ||
      getComponent('province') || // fallback если нет locality
      ''
    const street = getComponent('street') || ''
    const house = getComponent('house') || ''
    const block =
      getComponent('block') || // иногда корпус приходит как block
      getComponent('building') || // альтернативное название
      ''

    const parts = [city, street, house ? `д. ${house}` : '', block ? `корп. ${block}` : ''].filter(
      Boolean,
    )

    return parts.length ? parts.join(', ') : null
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Yandex reverse geocode error:', error.response?.data)
    } else {
      console.error(error)
    }
    return null
  }
}
