import { useState } from 'react'
import { RouteDetails } from '../routes/RouteDetails'
import { NavbarForm } from './NavbarForm'
import { NavbarHeader } from './ui/NavbarHeader'
import { NavbarSheet } from './ui/NavbarSheet'

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<NavbarSheet isOpen={isOpen} onToggle={() => setIsOpen((p) => !p)}>
			<div className='px-4 pb-6 max-h-[85vh] overflow-y-auto'>
				<NavbarHeader />
				<NavbarForm />
				<RouteDetails />
			</div>
		</NavbarSheet>
	)
}
