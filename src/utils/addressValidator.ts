export const addressValidator = () => {
  const isValidCoordinates = (value: string): boolean => {
    const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/

    if (!regex.test(value)) return false

    const [latStr, lngStr] = value.split(',').map(v => v.trim())

    const lat = Number(latStr)
    const lng = Number(lngStr)

    if (Number.isNaN(lat) || Number.isNaN(lng)) return false

    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }

  const isValidAddress = (value: string): boolean => {
    if (value.length < 3) return false
    if (/^\d+$/.test(value)) return false // только цифры — не адрес
    return true
  }

  return { isValidCoordinates, isValidAddress }
}
