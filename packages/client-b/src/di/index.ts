/* eslint-disable react-hooks/rules-of-hooks */
import infrastructuresFn from "./infrastructures"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import presentersFn from "./presenters"

export default function di(target: Storage) {
  const infrastructures = infrastructuresFn(target)
  const repositories = repositoriesFn(infrastructures)
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  return presenters
}
