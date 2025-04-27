import IInfrastructures from "adapters/infrastructures/interfaces/IInfrastructures"
import WebStorage from "adapters/infrastructures/WebStorage"

export default (target: Storage): IInfrastructures => {
  return {
    storage: new WebStorage(target)
  }
}
