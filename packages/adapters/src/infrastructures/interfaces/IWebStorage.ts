export interface IWebStorage {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data?: unknown): Promise<T>
  put<T>(url: string, data?: unknown): Promise<T>
  delete<T>(url: string): Promise<T>
}
