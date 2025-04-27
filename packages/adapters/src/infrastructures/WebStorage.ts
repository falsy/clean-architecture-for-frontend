import { IWebStorage } from "./interfaces/IWebStorage"

export default class WebStorage implements IWebStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  async get<T>(url: string): Promise<T> {
    const data = this.storage.getItem(url)
    return data ? JSON.parse(data) : null
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    try {
      this.storage.setItem(url, JSON.stringify(data))
      return true as T
    } catch {
      return false as T
    }
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    try {
      this.storage.setItem(url, JSON.stringify(data))
      return true as T
    } catch {
      return false as T
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      this.storage.removeItem(url)
      return true as T
    } catch {
      return false as T
    }
  }
}
