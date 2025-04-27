import IInfratructures from "adapters/infrastructures/interfaces/IInfrastructures"
import IRepositories from "domains/repositories/interfaces/IRepositories"
import PostRepository from "adapters/repositories/PostRepository"
import CommentRepository from "adapters/repositories/CommentRepository"
import UserRepository from "adapters/repositories/UserRepository"

export default (infrastructures: IInfratructures): IRepositories => {
  return {
    post: new PostRepository(infrastructures.connector),
    comment: new CommentRepository(infrastructures.connector),
    user: new UserRepository(infrastructures.connector)
  }
}
