import IUseCases from "domains/useCases/interfaces/IUseCases"
import PostUseCase from "domains/useCases/PostUseCase"
import UserUseCase from "domains/useCases/UserUseCase"
import IRepositories from "domains/repositories/interfaces/IRepositories"

export default (repository: IRepositories): IUseCases => {
  return {
    post: new PostUseCase(repository.post, repository.comment),
    user: new UserUseCase(repository.user)
  }
}
