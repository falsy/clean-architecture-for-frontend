import IInfratructures from "adapters/infrastructures/interfaces/IInfrastructures"
import IRepositories from "domains/repositories/interfaces/IRepositories"
import NetworkPostRepository from "adapters/repositories/post/NetworkPostRepository"
import NetworkCommentRepository from "adapters/repositories/comment/NetworkCommentRepository"
import UserRepository from "adapters/repositories/UserRepository"

export default (infrastructures: IInfratructures): IRepositories => {
  return {
    post: new NetworkPostRepository(infrastructures.network),
    comment: new NetworkCommentRepository(infrastructures.network),
    user: new UserRepository(infrastructures.network)
  }
}
