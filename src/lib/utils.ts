import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getCurrentWeek = () => {
  const today = dayjs()
  const dayOfWeek = today.day()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = today.add(mondayOffset, 'day')
  const week = Array.from({ length: 7 }, (_, index) => monday.add(index, 'day'))

  return week
}
