export const getGreeting = () => {
  const timeOfDay = new Date().getHours()
  let timing = ''
  if (timeOfDay >= 0 && timeOfDay < 12) {
    timing = 'morning'
  } else if (timeOfDay >= 12 && timeOfDay < 16) {
    timing = 'afternoon'
  } else if (timeOfDay >= 16 && timeOfDay < 21) {
    timing = 'evening'
  } else if (timeOfDay >= 21 && timeOfDay < 24) {
    timing = 'night'
  }
  return 'Good ' + timing
}

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const formatTime = (ts: string, withTimezone: boolean = false) => {
  var options: Intl.DateTimeFormatOptions = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const date = new Date(ts)

  let formattedTime = date.toLocaleDateString('en-US', options)

  if (withTimezone) {
    const timezone = new Date()
      .toLocaleTimeString('en-us', { timeZoneName: 'short' })
      .split(' ')[2]
    formattedTime += ' ' + timezone
  }
  return formattedTime
}

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (ts: string, format?: string) => {
  const d = new Date(ts)
  const day = d.getDate()
  const months = format === 'short' ? MONTHS_SHORT : MONTHS
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  let suffix = ''
  switch (day) {
    case 1:
      suffix = 'st'
      break
    case 2:
      suffix = 'nd'
      break
    case 3:
      suffix = 'rd'
      break
    default:
      suffix = 'th'
  }
  return `${month} ${day}${suffix}, ${year}`
}

export const timeAgo = (ts: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(ts).getTime()) / 1000
  )

  let interval = seconds / 31536000

  const appendUnit = (unit: string, interval: number) => {
    const flooredInterval = Math.floor(interval)
    return (
      flooredInterval + ' ' + unit + (flooredInterval === 1 ? '' : 's') + ' ago'
    )
  }

  if (interval > 1) {
    return appendUnit('year', interval)
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return appendUnit('month', interval)
  }
  interval = seconds / 86400
  if (interval > 1) {
    return appendUnit('day', interval)
  }
  interval = seconds / 3600
  if (interval > 1) {
    return appendUnit('hour', interval)
  }
  interval = seconds / 60
  if (interval > 1) {
    return appendUnit('minute', interval)
  }
  return appendUnit('second', interval)
}

const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export const indexToLetter = (index: number) => ALPHABETS[index]

export const nFormat = (num: number, digits: number) => {
  const BASE = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const item = BASE.slice()
    .reverse()
    .find((item) => num >= item.value)
  return item
    ? (num / item.value)
        .toFixed(digits)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + item.symbol
    : '0'
}

type GetRating = (r: Object) => { rating: number; totalRatings: number }

export const getRating: GetRating = (r: any) => {
  delete r._id
  const ratings: Array<Array<string>> = Object.entries(r)

  if (ratings === undefined) return { rating: 0, totalRatings: 0 }

  let rating = 0
  let sum = 0
  let totalRatings: number = 0

  for (let [key, value] of ratings) {
    const v = parseInt(value)
    totalRatings += v
    sum += parseInt(key) * v
  }

  if (totalRatings > 0) {
    rating = Math.round(sum / totalRatings)
  }

  return { rating, totalRatings }
}

export const sleep = async (timeout: number = 3000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Deleted')
    }, 4000)
  })
}
