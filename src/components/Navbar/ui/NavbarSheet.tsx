import styles from '../Navbar.module.scss'

type Props = {
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export const NavbarSheet = ({ isOpen, onToggle, children }: Props) => {
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-(--bg-primary)
        shadow-2xl rounded-t-3xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? styles.open : styles.closed}
      `}
    >
      <div
        className='h-10 flex justify-center items-center cursor-pointer'
        onClick={onToggle}
      >
        <div className='w-12 h-1.5 bg-gray-400 rounded-full' />
      </div>

      {children}
    </div>
  )
}