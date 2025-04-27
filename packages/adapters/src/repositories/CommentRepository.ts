import ICommentRepository from "domains/repositories/interfaces/ICommentRepository"
import ICommentDTO from "domains/dtos/interfaces/ICommentDTO"
import IConnector from "../infrastructures/interfaces/IConnector"
import CommentDTO from "../dtos/CommentDTO"

export default class CommentRepository implements ICommentRepository {
  private connector: IConnector

  constructor(connector: IConnector) {
    this.connector = connector
  }

  async getComments(postId: string): Promise<ICommentDTO[]> {
    try {
      const { data } = await this.connector.get<ICommentDTO[]>(
        `/api/posts/${postId}/comments`
      )

      if (!data) {
        return []
      }

      return data.map((comment) => {
        return new CommentDTO(comment)
      })
    } catch (e) {
      console.error(e)
    }
  }

  async createComment(postId: string, content: string): Promise<boolean> {
    try {
      const { data } = await this.connector.post<boolean>(
        `/api/posts/${postId}/comments`,
        {
          content
        }
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }

  async updateComment(commentId: string, content: string): Promise<string> {
    try {
      const { data } = await this.connector.put<string>(
        `/api/comments/${commentId}`,
        {
          content
        }
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      const { data } = await this.connector.delete<boolean>(
        `/api/comments/${commentId}`
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }
}
