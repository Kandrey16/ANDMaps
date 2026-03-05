import carIcon from '../assets/car.png'
import bicycleIcon from '../assets/icons8-bicycle-48.png'
import walkingIcon from '../assets/walking.png'

const PROFILE_ICONS: Record<string, string> = {
  driving: carIcon,
  walking: walkingIcon,
  cycling: bicycleIcon,
}

export function getIconByProfile(profile: string): string {
  return PROFILE_ICONS[profile] || carIcon // fallback
}
