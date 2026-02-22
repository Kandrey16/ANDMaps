// Navbar.tsx
import { useState } from 'react'
import { Details } from '../Details'
import { NavbarForm } from '../NavbarForm'
import styles from './Navbar.module.scss'
import { useTheme } from '../../hooks/useTheme'

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { theme, toggleTheme } = useTheme()

	return (
		<div
			className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white/90
        dark:bg-black/90 shadow-2xl rounded-t-3xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? styles.open : styles.closed}
      `}
		>
			<div
				className='h-10 flex justify-center items-center cursor-pointer'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className='w-12 h-1.5 bg-gray-400 rounded-full' />
			</div>

			<div className='px-4 pb-6 max-h-[85vh] overflow-y-auto'>
				<div className='flex flex-row justify-between'>
					<h1 className='text-2xl font-bold py-3 dark:text-white text-black'>
						ANDMaps
					</h1>
					<button onClick={toggleTheme}>
						{theme === 'light' ? '🌙 Dark' : '☀️ Light'}
					</button>
				</div>
				<NavbarForm />
				<Details />
			</div>
		</div>
	)
}
