import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant
	size?: Size
	loading?: boolean
	icon?: ReactNode
	fullWidth?: boolean
	animated?: boolean
}

const variantStyles: Record<Variant, string> = {
	primary: 'bg-blue-600 text-white hover:bg-blue-700',
	danger: 'bg-red-600/20 text-red-400 hover:bg-red-600/40',
	ghost: 'bg-transparent hover:bg-[--bg-secondary]',
}

const sizeStyles: Record<Size, string> = {
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2',
	lg: 'px-5 py-3 text-lg',
}

export const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	loading = false,
	icon,
	fullWidth = false,
	animated = false,
	disabled,
	className,
	...props
}: Props) => {
	return (
		<button
			disabled={loading || disabled}
			className={clsx(
				'rounded transition-colors',
				variantStyles[variant],
				sizeStyles[size],
				fullWidth && 'w-full',
				(loading || disabled) && 'opacity-60 cursor-not-allowed',
				className
			)}
			{...props}
		>
			{animated ? (
				<motion.div
					whileHover={{ scale: 1.05 }}
					transition={{ type: 'spring', stiffness: 400, damping: 20 }}
				>
					<div className='flex items-center justify-center gap-2'>
						{children}
						{icon}
					</div>{' '}
				</motion.div>
			) : (
				<div className='flex items-center justify-center gap-2'>
					{children}
					{icon}
				</div>
			)}
		</button>
	)
}
