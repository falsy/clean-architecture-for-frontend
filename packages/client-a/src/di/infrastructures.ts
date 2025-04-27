import IInfrastructures from "adapters/infrastructures/interfaces/IInfrastructures"
import AxiosHTTP from "adapters/infrastructures/AxiosHTTP"

export default (baseUrl: string): IInfrastructures => {
  return {
    connector: new AxiosHTTP(baseUrl)
  }
}
