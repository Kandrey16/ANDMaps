import { X } from 'lucide-react'
import type { RouteLegs } from '../types/route.type'
import { useRouteStore } from '../store/route.store'
import type { LngLat } from '@yandex/ymaps3-types'
import { useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

type RouteInfoProps = {
	data: RouteLegs | null
	isOpen: boolean
	onClose: () => void
}

export const RouteInfo = ({ data, isOpen, onClose }: RouteInfoProps) => {
	const { setMapLocation } = useRouteStore()
	const [active, setActive] = useState(0)

	function setLocation(coords: LngLat) {
		setMapLocation(coords, 16)
	}

	return (
		<div className='mt-4'>
			<AnimatePresence>
				{isOpen && data && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
						className='overflow-hidden mt-2'
					>
						<div className='rounded-lg p-3 bg-[--panel-bg]'>
							<div className='flex justify-between items-center mb-3'>
								<span className='font-medium'>Маршрут:</span>
								<X
									className='cursor-pointer text-(--text-secondary) hover:text-[--accent]'
									onClick={onClose}
								/>
							</div>
							<div className='text-xs space-y-1 pr-1'>
								{data.steps.map((step, i) => (
									<div
										key={i}
										className={clsx(
											'flex gap-2 px-3 py-2 cursor-pointer rounded-lg transition-colors',
											i === active
												? 'bg-[--bg-secondary] text-[--text-primary]'
												: 'hover:bg-[--bg-secondary]/70 text-[--text-secondary]'
										)}
										onClick={() => {
											if (step.maneuver?.location) {
												setLocation(step.maneuver.location)
												setActive(i)
											}
										}}
									>
										<span className='text-[--text-secondary] w-5 shrink-0'>
											{i + 1}.
										</span>
										<div className='flex-1'>
											<span className='font-medium text-[--text-primary]'>
												{step.maneuver?.instruction || 'Двигайтесь прямо'}
											</span>
											{step.name && (
												<span className='text-[--text-secondary]'>
													{' '}
													по {step.name}
												</span>
											)}
											{step.ref && (
												<span className='text-[--text-secondary]'>
													{' '}
													({step.ref})
												</span>
											)}
											<span className='text-[--text-secondary] ml-2'>
												→ {(step.distance / 1000).toFixed(1)} км
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
