import { isToday, isYesterday, format } from 'date-fns'

export function getNameInitials(name: string): string {
  const initial = name.split(' ')[0].charAt(0).toUpperCase()
  return initial
}

export function formatToHMSdate(dateStr: string): string {
  const date = new Date(dateStr)
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date)
  return formattedDate
}

export function formatToHMS(datetime: string): string {
  const date = new Date(datetime)

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

export function getFriendlyDateLabel(date: Date | string) {
  const parsed = typeof date === 'string' ? new Date(date) : date

  if (isToday(parsed)) return 'Today'
  if (isYesterday(parsed)) return 'Yesterday'

  return format(parsed, 'EEEE')
}

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}
