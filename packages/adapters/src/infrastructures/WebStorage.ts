import { IConnectorResponse } from "./interfaces/IConnector"
import { IWebStorage } from "./interfaces/IWebStorage"

export default class WebStorage implements IWebStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  async get<T>(url: string): Promise<IConnectorResponse<T>> {
    const data = this.storage.getItem(url)
    return data
      ? {
          data: JSON.parse(data),
          status: 200
        }
      : {
          data: null,
          status: 404
        }
  }

  async post<T>(url: string, data?: unknown): Promise<IConnectorResponse<T>> {
    try {
      this.storage.setItem(url, JSON.stringify(data))
      return {
        status: 201,
        data: true as T
      }
    } catch {
      return {
        status: 500,
        data: false as T
      }
    }
  }

  async put<T>(url: string, data?: unknown): Promise<IConnectorResponse<T>> {
    try {
      this.storage.setItem(url, JSON.stringify(data))
      return {
        status: 201,
        data: true as T
      }
    } catch {
      return {
        status: 500,
        data: false as T
      }
    }
  }

  async delete<T>(url: string): Promise<IConnectorResponse<T>> {
    try {
      this.storage.removeItem(url)
      return {
        status: 201,
        data: true as T
      }
    } catch {
      return {
        status: 500,
        data: false as T
      }
    }
  }
}
