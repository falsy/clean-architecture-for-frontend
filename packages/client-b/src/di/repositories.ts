import IInfratructures from "adapters/infrastructures/interfaces/IInfrastructures"
import StoragePostRepository from "adapters/repositories/post/StoragePostRepository"
import StorageCommentRepository from "adapters/repositories/comment/StorageCommentRepository"
import UserRepository from "adapters/repositories/UserRepository"
import IRepositories from "./interfaces/IRepositories"

export default (infrastructures: IInfratructures): IRepositories => {
  return {
    post: new StoragePostRepository(infrastructures.storage),
    comment: new StorageCommentRepository(infrastructures.storage),
    user: new UserRepository(infrastructures.storage)
  }
}
