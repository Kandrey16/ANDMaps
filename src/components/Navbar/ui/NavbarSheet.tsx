import styles from '../Navbar.module.css'

type Props = {
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export const NavbarSheet = ({ isOpen, onToggle, children }: Props) => {
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-(--bg-primary) shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? styles.open : styles.closed} `}
    >
      <div className="flex h-10 cursor-pointer items-center justify-center" onClick={onToggle}>
        <div className="h-1.5 w-12 rounded-full bg-gray-400" />
      </div>

      {children}
    </div>
  )
}
