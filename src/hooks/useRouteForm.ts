import { useForm } from 'react-hook-form'
import { useSearchStore } from '../store/search.store'
import { useEffect } from 'react'
import { getCurrentPosition } from '../utils/getCurrentPosition'
import { DEFAULT_POINT_B } from '../config/location.config'
import type { FormData } from '../types/formData.type'

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

	function getCompanyLocation() {
		setValue('pointB', DEFAULT_POINT_B)
	}

	function clearValues() {
		setValue('pointA', '')
		setValue('pointB', '')
	}

	return { form, getPosition, getCompanyLocation, clearValues }
}
