import CryptoJS from "crypto-js"
import IUserInfoVO from "domains/vos/interfaces/IUserInfoVO"
import ICommentVM, { ICommentVMParams } from "./interfaces/ICommentVM"

export default class CommentVM implements ICommentVM {
  readonly id: string
  readonly postId: string
  readonly author: IUserInfoVO
  readonly createdAt: Date
  key: string
  content: string
  updatedAt: Date

  constructor(parmas: ICommentVMParams) {
    this.id = parmas.id
    this.postId = parmas.postId
    this.author = parmas.author
    this.content = parmas.content
    this.createdAt = parmas.createdAt
    this.updatedAt = parmas.updatedAt
    this.key = this.generateKey(this.id, this.updatedAt)
  }

  updateContent(content: string): void {
    this.content = content
    this.updatedAt = new Date()
    this.key = this.generateKey(this.id, this.updatedAt)
  }

  applyUpdatedAt(date: Date): void {
    this.updatedAt = date
    this.key = this.generateKey(this.id, this.updatedAt)
  }

  private generateKey(id: string, updatedAt: Date): string {
    const base = `${id}-${updatedAt.getTime()}`
    return CryptoJS.MD5(base).toString()
  }
}
