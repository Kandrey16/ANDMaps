import type { LngLat } from '@yandex/ymaps3-types'
import { useState } from 'react'

import { geocode } from '../services/geocode.service'
import { useRouteStore } from '../store/route.store'
import { useSearchStore } from '../store/search.store'
import type { FormData } from '../types/formData.type'
import { RouteProfile } from '../types/route.type'
import { detectInputType } from '../utils/detectInputType'
import { parseCoordinates } from '../utils/parseCoordinates'

export function useRouteSubmit() {
  const { buildRoute, isLoading } = useRouteStore()
  const { setDraftPointA, setDraftPointB, setLastInputA, setLastInputB, setHistoryPoints } =
    useSearchStore()
  const [error, setError] = useState<string | null>(null)

  const submit = async (data: FormData) => {
    setError(null)
    const inputA = data.pointA.trim()
    const inputB = data.pointB.trim()

    let pointA: LngLat | null = null
    let pointB: LngLat | null = null

    if (detectInputType(inputA) === 'coordinates') {
      pointA = parseCoordinates(inputA)
    } else {
      setLastInputA(inputA)
      pointA = await geocode(inputA)
    }
    if (detectInputType(inputB) === 'coordinates') {
      pointB = parseCoordinates(inputB)
    } else {
      setLastInputB(inputB)
      pointB = await geocode(inputB)
    }

    if (!pointA || !pointB) {
      setError('Ничего не найдено')
      return
    }

    setDraftPointA(pointA)
    setDraftPointB(pointB)
    setHistoryPoints(inputA, inputB)

    Object.values(RouteProfile).forEach(profile => {
      buildRoute(pointA, pointB, profile)
    })
  }

  return { submit, isLoading, error }
}
