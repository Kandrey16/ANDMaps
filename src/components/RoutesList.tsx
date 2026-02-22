// RoutesList.tsx
import { useRouteStore } from '../store/route.store'

const profileIcons = {
	driving: '🚗',
	walking: '🚶',
	cycling: '🚲',
}

const profileText = {
	driving: 'На автомобиле',
	walking: 'Пешком',
	cycling: 'На велосипеде',
}

export const RoutesList = () => {
	const { routes, activeRouteId, setActiveRoute } = useRouteStore()

	return (
		<div className='space-y-2 rounded-xl shadow-lg'>
			{routes.map((cur) => (
				<div
					key={cur.id}
					className={`p-3 rounded cursor-pointer transition-colors 
						${
							cur.id === activeRouteId
								? 'bg-[--bg-secondary] border-l-4 border-(--accent)'
								: 'hover:bg-[--bg-secondary]/50'
						}`}
					onClick={() => setActiveRoute(cur.id)}
				>
					<div className='flex flex-row justify-between items-center gap-2'>
						<div>
							<span className='text-lg'>
								{profileIcons[cur.profile] || '❓'}
							</span>
							<span>{profileText[cur.profile]}</span>
							<div>{(cur.distance / 1000).toFixed(1)} км</div>
						</div>
						<div className='text-xl'>
							{Math.floor(cur.duration / 3600) > 0 && (
								<>{Math.floor(cur.duration / 3600)} ч </>
							)}
							{Math.round((cur.duration % 3600) / 60)} мин
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
