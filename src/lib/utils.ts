export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePhone = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(phone)

export const truncate = (str: string, len: number): string =>
  str.length > len ? `${str.slice(0, len)}...` : str

export const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
