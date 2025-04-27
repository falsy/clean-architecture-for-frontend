import IConnector, { IConnectorResponse } from "./IConnector"

export interface IWebStorage extends IConnector {
  get<T>(url: string): Promise<IConnectorResponse<T>>
  post<T>(url: string, data?: unknown): Promise<IConnectorResponse<T>>
  put<T>(url: string, data?: unknown): Promise<IConnectorResponse<T>>
  delete<T>(url: string): Promise<IConnectorResponse<T>>
}
