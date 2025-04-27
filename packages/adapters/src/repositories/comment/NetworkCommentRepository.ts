import ICommentRepository from "domains/repositories/interfaces/ICommentRepository"
import ICommentDTO from "domains/dtos/interfaces/ICommentDTO"
import CommentDTO from "adapters/dtos/CommentDTO"
import { IAxiosHTTP } from "adapters/infrastructures/interfaces/IAxiosHTTP"

export default class NetworkCommentRepository implements ICommentRepository {
  private connector: IAxiosHTTP

  constructor(connector: IAxiosHTTP) {
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
