import Map from './components/Map/Map'
import { Navbar } from './components/Navbar/Navbar'

export default function App() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="absolute inset-0">
        <Map />
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full rounded-t-xl shadow-lg md:top-0 md:bottom-auto md:h-full md:w-80 md:rounded-none">
        <Navbar />
      </div>
    </div>
  )
}
