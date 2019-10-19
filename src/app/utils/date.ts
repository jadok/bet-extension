export const convertFullDashFormat = (date: string, time: string) => (new Date(`${date.split('/').reverse().join('-')}T${time.replace('h', ':')}`)).toISOString()
export const convertShortDashFormat = (date: string) => (new Date(date.split('/').reverse().join('-'))).toISOString()
