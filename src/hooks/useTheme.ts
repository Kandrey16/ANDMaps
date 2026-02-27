import { useEffect, useState } from 'react'

export function useTheme() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
		if (saved) {
			setTheme(saved)
			document.documentElement.classList.toggle('dark', saved === 'dark')
		}
	}, [])

	const toggleTheme = () => {
		const next = theme === 'light' ? 'dark' : 'light'
		setTheme(next)
		localStorage.setItem('theme', next)
		document.documentElement.classList.toggle('dark', next === 'dark')
	}

	return { theme, toggleTheme }
}
