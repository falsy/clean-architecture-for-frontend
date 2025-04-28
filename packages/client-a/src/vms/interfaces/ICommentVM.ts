import IUserInfoVO from "domains/vos/interfaces/IUserInfoVO"

export default interface ICommentVM {
  readonly id: string
  readonly postId: string
  readonly author: IUserInfoVO
  readonly createdAt: Date
  key: string
  content: string
  updatedAt: Date
  updateContent(content: string): void
  applyUpdatedAt(date: Date): void
}

export interface ICommentVMParams {
  readonly id: string
  readonly postId: string
  readonly author: IUserInfoVO
  readonly content: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
