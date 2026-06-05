const session = {
  get<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(key)
      if (!raw) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string): void {
    sessionStorage.removeItem(key)
  },

  clear(): void {
    sessionStorage.clear()
  },
}

export default session
