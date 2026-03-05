import { Route } from 'lucide-react'

import marker_finish from '../../assets/marker_finish.svg'
import marker_start from '../../assets/marker_start.svg'
import { MOSCOW_COUNDS } from '../../config/location.config'
import { useRouteForm } from '../../hooks/useRouteForm'
import { useRouteSubmit } from '../../hooks/useRouteSubmit'
import { AnswerVariant } from '../../types/answers'
import { addressValidator } from '../../utils/addressValidator'
import { Button } from '../ui/Button'
import { RouteInputField } from './RouteInputField'

export const NavbarForm = () => {
  const { submit, isLoading, error } = useRouteSubmit()
  const { form, getSomePosition, clearValues } = useRouteForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form
  const { isValidAddress, isValidCoordinates } = addressValidator()

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <RouteInputField
        icon={marker_start}
        placeholder="Откуда"
        register={register('pointA', {
          required: 'Обязательное поле',
          validate: (value: string) => {
            const trimmed = value.trim()

            if (!trimmed) return 'Введите адрес или координаты'

            if (isValidCoordinates(trimmed)) return true
            if (isValidAddress(trimmed)) return true

            return 'Введите корректный адрес или координаты в формате: 55.751244, 37.618423'
          },
        })}
        error={errors.pointA}
        onIconClick={() => getSomePosition('pointA', MOSCOW_COUNDS)}
        answerVariant={AnswerVariant.A}
      />
      <RouteInputField
        icon={marker_finish}
        placeholder="Куда"
        register={register('pointB', {
          required: 'Обязательное поле',
          validate: (value: string) => {
            const trimmed = value.trim()

            if (!trimmed) return 'Введите адрес или координаты'

            if (isValidCoordinates(trimmed)) return true
            if (isValidAddress(trimmed)) return true

            return 'Введите корректный адрес или координаты в формате: 55.751244, 37.618423'
          },
        })}
        error={errors.pointB}
        onIconClick={() => getSomePosition('pointB', MOSCOW_COUNDS)}
        answerVariant={AnswerVariant.B}
      />
      <div className="flex w-full justify-end px-2" onClick={() => clearValues()}>
        <p className="hover:text-white">Сбросить</p>
      </div>
      {error && <p className="px-2 text-sm text-red-500">{error}</p>}
      <Button type="submit" loading={isLoading} icon={<Route size={18} />} fullWidth animated>
        {isLoading ? 'Строим маршрут...' : 'Построить маршрут'}
      </Button>
    </form>
  )
}
