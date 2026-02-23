import carIcon from '../assets/car.png'
import walkingIcon from '../assets/walking.png'
import bicycleIcon from '../assets/icons8-bicycle-48.png'

const PROFILE_ICONS: Record<string, string> = {
  driving: carIcon,
  walking: walkingIcon,
  cycling: bicycleIcon,
}

export function getIconByProfile(profile: string): string {
  return PROFILE_ICONS[profile] || carIcon // fallback
}
