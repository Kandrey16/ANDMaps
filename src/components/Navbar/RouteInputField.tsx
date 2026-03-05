import { CircleQuestionMark } from 'lucide-react'
import { useState } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import type { AnswerVariant } from '../../types/answers'
import { Answer } from '../ui/Answer'

type RouteInputFieldProps = {
  icon: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: FieldError
  onIconClick: () => void
  answerVariant: AnswerVariant
}

export const RouteInputField = ({
  icon,
  placeholder,
  register,
  error,
  onIconClick,
  answerVariant,
}: RouteInputFieldProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="suggest-container relative">
      <div className="flex w-full flex-row items-center gap-2">
        <div className="flex flex-1 items-center rounded-lg border px-4 py-2">
          <img alt="" src={icon} className="h-5 w-5 cursor-pointer" onClick={onIconClick} />
          <input
            {...register}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none"
          />
        </div>

        <CircleQuestionMark onClick={() => setOpen(!open)} />
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {open && <Answer isOpen={true} variant={answerVariant} />}
    </div>
  )
}
