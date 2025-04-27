import IPostUseCase from "domains/useCases/interfaces/IPostUseCase"
import IUserUseCase from "domains/useCases/interfaces/IUserUseCase"

export default interface IUseCases {
  post: IPostUseCase
  user: IUserUseCase
}
