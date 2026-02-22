// RouteInfoSection.tsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { RouteInfo } from './RouteInfo'
import { useRouteStore } from '../store/route.store'

export const RouteInfoSection = () => {
	const { activeRoute } = useRouteStore()
	const [open, setOpen] = useState(false)

	const route = activeRoute()
	const legs = route?.legs?.[0]

	if (!legs?.steps) return null

	return (
		<div className='mt-4'>
			<button
				className='flex items-center gap-2 text-sm font-medium hover:text-[--accent]'
				onClick={() => setOpen(!open)}
			>
				<span>Подробнее о маршруте</span>
				{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
			</button>

			{open && (
				<RouteInfo data={legs} isOpen={open} onClose={() => setOpen(false)} />
			)}
		</div>
	)
}
