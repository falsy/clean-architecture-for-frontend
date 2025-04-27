/* eslint-disable react-hooks/rules-of-hooks */
import { API_URL } from "../constants"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import presentersFn from "./presenters"
import infrastructuresFn from "./infrastructures"

export default function di(apiUrl = API_URL) {
  const infrastructures = infrastructuresFn(apiUrl)
  const repositories = repositoriesFn(infrastructures)
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  return presenters
}
