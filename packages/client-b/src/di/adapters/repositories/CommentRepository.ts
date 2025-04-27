import IConnector from "adapters/infrastructures/interfaces/IConnector"
import ICommentRepository from "domains/repositories/interfaces/ICommentRepository"
import ICommentDTO from "domains/dtos/interfaces/ICommentDTO"
import UserInfoVO from "domains/vos/UserInfoVO"
import CommentDTO from "adapters/dtos/CommentDTO"

export default class CommentRepository implements ICommentRepository {
  private connector: IConnector

  constructor(connector: IConnector) {
    this.connector = connector
  }

  async getComments(postId: string): Promise<ICommentDTO[]> {
    try {
      const { data } = await this.connector.get<ICommentDTO[]>("comments")

      if (!data) {
        return []
      }

      const filter = data.filter((comment) => comment.postId === postId)

      return filter.map((comment) => {
        return new CommentDTO(comment)
      })
    } catch (e) {
      console.error(e)
    }
  }

  async createComment(postId: string, content: string): Promise<boolean> {
    try {
      const newComment = new CommentDTO({
        id: String(Date.now()),
        postId,
        content,
        author: new UserInfoVO({
          userId: "1",
          userName: "falsy"
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      const comments = await this.getComments(postId)
      const { data: isSucess } = await this.connector.post<boolean>(
        "comments",
        comments.concat(newComment)
      )

      return isSucess
    } catch (e) {
      console.error(e)
    }
  }

  async updateComment(commentId: string, content: string): Promise<string> {
    try {
      const { data } = await this.connector.get<ICommentDTO[]>("comments")
      const findIndex = data.findIndex((comment) => comment.id === commentId)
      const updateAt = new Date().toISOString()

      data[findIndex].content = content
      data[findIndex].updatedAt = updateAt

      const { data: isSucess } = await this.connector.put<boolean>(
        "comments",
        data
      )

      return isSucess ? updateAt : ""
    } catch (e) {
      console.error(e)
    }
  }

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      const { data } = await this.connector.get<ICommentDTO[]>("comments")
      const filter = data.filter((comment) => comment.id !== commentId)

      const { data: isSucess } = await this.connector.put<boolean>(
        "comments",
        filter
      )

      return isSucess
    } catch (e) {
      console.error(e)
    }
  }
}
