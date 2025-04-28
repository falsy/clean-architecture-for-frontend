import IComment from "domains/entities/interfaces/IComment"
import IUserInfoVO from "domains/vos/interfaces/IUserInfoVO"
import ICommentVM from "./ICommentVM"

export default interface IPostVM {
  readonly id: string
  readonly author: IUserInfoVO
  readonly createdAt: Date
  key: string
  title: string
  content: string
  comments: ICommentVM[]
  updatedAt: Date
  updateTitle(title: string): void
  updateContent(content: string): void
  deleteComment(commentId: string): void
  applyUpdatedAt(date: Date): void
}

export interface IPostVMParams {
  readonly id: string
  readonly title: string
  readonly content: string
  readonly author: IUserInfoVO
  readonly comments: IComment[]
  readonly createdAt: Date
  readonly updatedAt: Date
}
