import { IAxiosHTTP } from "./IAxiosHTTP"
import { IWebStorage } from "./IWebStorage"

export default interface IInfratructures {
  network?: IAxiosHTTP
  storage?: IWebStorage
}
