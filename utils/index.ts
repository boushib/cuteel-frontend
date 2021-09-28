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
