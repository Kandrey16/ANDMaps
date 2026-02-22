import './App.css'
import Map from './components/Map'
import { Navbar } from './components/Navbar/Navbar'

export default function App() {
	return (
		<div className='relative h-dvh w-full overflow-hidden'>
			<div className='absolute inset-0'>
				<Map />
			</div>
			<div
				className='
				absolute
				left-0
				bottom-0
				w-full
				md:top-0 md:bottom-auto md:h-full md:w-80
				md:rounded-none rounded-t-xl
				z-10 shadow-lg
				'
			>
				<Navbar />
			</div>
		</div>
	)
}
