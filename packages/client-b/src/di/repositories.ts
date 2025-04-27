import IInfratructures from "adapters/infrastructures/interfaces/IInfrastructures"
import PostRepository from "./adapters/repositories/PostRepository"
import CommentRepository from "./adapters/repositories/CommentRepository"
import UserRepository from "adapters/repositories/UserRepository"
import IRepositories from "./interfaces/IRepositories"

export default (infrastructures: IInfratructures): IRepositories => {
  return {
    post: new PostRepository(infrastructures.connector),
    comment: new CommentRepository(infrastructures.connector),
    user: new UserRepository(infrastructures.connector)
  }
}
