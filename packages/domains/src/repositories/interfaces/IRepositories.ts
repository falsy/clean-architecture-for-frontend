import IPostRepository from "domains/repositories/interfaces/IPostRepository"
import ICommentRepository from "domains/repositories/interfaces/ICommentRepository"
import IUserRepository from "domains/repositories/interfaces/IUserRepository"

export default interface IRepositories {
  post: IPostRepository
  comment: ICommentRepository
  user: IUserRepository
}
