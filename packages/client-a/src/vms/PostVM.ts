import CryptoJS from "crypto-js"
import IUserInfoVO from "domains/vos/interfaces/IUserInfoVO"
import IPostVM, { IPostVMParams } from "./interfaces/IPostVM"
import ICommentVM from "./interfaces/ICommentVM"
import CommentVM from "./CommentVM"

export default class PostVM implements IPostVM {
  readonly id: string
  readonly author: IUserInfoVO
  readonly createdAt: Date
  key: string
  title: string
  content: string
  comments: ICommentVM[]
  updatedAt: Date

  constructor(params: IPostVMParams) {
    this.id = params.id
    this.title = params.title
    this.content = params.content
    this.author = params.author
    this.comments = params.comments.map((comment) => new CommentVM(comment))
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.key = this.generateKey(this.id, this.updatedAt)
  }

  updateTitle(title: string): void {
    this.title = title
    this.updatedAt = new Date()
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

  deleteComment(commentId: string): void {
    this.comments = this.comments.filter((comment) => comment.id !== commentId)
    this.updatedAt = new Date()
    this.key = this.generateKey(this.id, this.updatedAt)
  }

  private generateKey(id: string, updatedAt: Date): string {
    const base = `${id}-${updatedAt.getTime()}`
    return CryptoJS.MD5(base).toString()
  }
}
