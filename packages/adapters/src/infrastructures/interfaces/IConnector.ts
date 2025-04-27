export default interface IConnector {
  get<T>(url: string, config?: unknown): Promise<IConnectorResponse<T>>
  post<T>(
    url: string,
    data?: unknown,
    config?: unknown
  ): Promise<IConnectorResponse<T>>
  put<T>(
    url: string,
    data?: unknown,
    config?: unknown
  ): Promise<IConnectorResponse<T>>
  delete<T>(url: string, config?: unknown): Promise<IConnectorResponse<T>>
}

export interface IConnectorResponse<T> {
  data: T
  status: number
}
