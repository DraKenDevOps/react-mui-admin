const PERSON_ID_KEY = 'PERSON_ID'
const EXPIRY_DAYS = 3

const cookies = {
  getPersonId(): string | null {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${PERSON_ID_KEY}=([^;]*)`),
    )
    return match ? decodeURIComponent(match[1]) : null
  },

  setPersonId(id: string): void {
    const expires = new Date(Date.now() + EXPIRY_DAYS * 86400000).toUTCString()
    document.cookie = `${PERSON_ID_KEY}=${encodeURIComponent(id)}; expires=${expires}; path=/`
  },

  removePersonId(): void {
    document.cookie = `${PERSON_ID_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  },
}

export default cookies
