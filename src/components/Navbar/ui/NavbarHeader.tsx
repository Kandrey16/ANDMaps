import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../../hooks/useTheme'

export const NavbarHeader = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className='flex flex-row justify-between'>
			<h1 className='text-2xl font-bold py-3'>ANDMaps</h1>
			<button onClick={toggleTheme}>
				{theme === 'light' ? <Moon /> : <Sun />}
			</button>
		</div>
	)
}
