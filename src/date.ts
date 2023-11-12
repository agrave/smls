import dayjs from 'dayjs'
import { type Dayjs } from 'dayjs'

type Period = 'week' | 'month' | string

export function dateRange(period: Period = 'week'): string[] {
  const range: string[] = []

  let inPeriod: (day: Dayjs) => boolean

  switch (period) {
    case 'week':
      inPeriod = (day) => day.day() !== 0
      break
    case 'month':
      inPeriod = (day) => day.isAfter(dayjs().startOf('month'))
      break
    default:
      if (!dayjs(period).isValid()) throw new Error('Invalid date format')
      inPeriod = (day) => day.isAfter(dayjs(period))
      break
  }
  let day = dayjs()
  do {
    range.push(day.format('YYYY-MM-DD'))
    day = day.add(-1, 'day')
  } while (inPeriod(day))

  return range.reverse()
}
