import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_POINT_B } from '../config/location.config'
import { reverseGeocode } from '../services/geocode.service'
import { useSearchStore } from '../store/search.store'
import type { BoundsType } from '../types/bounds.type'
import type { FormData } from '../types/formData.type'
import { getCurrentPosition } from '../utils/getCurrentPosition'
import { getRandomPosition } from '../utils/getRandomPosition'

export function useRouteForm() {
  const { lastInputA, lastInputB } = useSearchStore()
  const form = useForm<FormData>({
    defaultValues: {
      pointA: lastInputA,
      pointB: lastInputB,
    },
    mode: 'onChange',
  })
  const { setValue } = form

  useEffect(() => {
    setValue('pointA', lastInputA)
  }, [lastInputA, setValue])

  useEffect(() => {
    setValue('pointB', lastInputB)
  }, [lastInputB, setValue])

  const getPosition = async () => {
    const coordsString = await getCurrentPosition()
    if (coordsString) {
      setValue('pointA', coordsString)
    }
  }

  const getSomePosition = async (point: keyof FormData, bounds: BoundsType) => {
    const coords = await getRandomPosition(bounds)
    const coordsString = await reverseGeocode(coords)
    if (coordsString) {
      setValue(point, coordsString)
    }
  }

  function getCompanyLocation() {
    setValue('pointB', DEFAULT_POINT_B)
  }

  function clearValues() {
    setValue('pointA', '')
    setValue('pointB', '')
  }

  return {
    form,
    getPosition,
    getSomePosition,
    getCompanyLocation,
    clearValues,
  }
}
