import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface IAxiosHTTP {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
