import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { IAxiosHTTP } from "adapters/infrastructures/interfaces/IAxiosHTTP"

export default class AxiosHTTP implements IAxiosHTTP {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      ...config
    })
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config)
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }
}
