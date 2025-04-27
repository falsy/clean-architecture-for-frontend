import { AxiosRequestConfig } from "axios"
import IConnector, { IConnectorResponse } from "./IConnector"

export interface IAxiosHTTP extends IConnector {
  get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IConnectorResponse<T>>
  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<IConnectorResponse<T>>
  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<IConnectorResponse<T>>
  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IConnectorResponse<T>>
}
