import { IRequestPostParams } from "domains/aggregates/interfaces/IPost"
import IPostDTO from "domains/dtos/interfaces/IPostDTO"
import UserInfoVO from "domains/vos/UserInfoVO"
import IPostRepository from "domains/repositories/interfaces/IPostRepository"
import PostDTO from "adapters/dtos/PostDTO"
import { IAxiosHTTP } from "adapters/infrastructures/interfaces/IAxiosHTTP"

export default class NetworkPostRepository implements IPostRepository {
  private connector: IAxiosHTTP

  constructor(connector: IAxiosHTTP) {
    this.connector = connector
  }

  async getPosts(): Promise<IPostDTO[]> {
    try {
      const { data } = await this.connector.get<IPostDTO[]>("/api/posts")

      if (!data) {
        return []
      }

      return data.map((post) => {
        return new PostDTO({
          id: post.id,
          title: post.title,
          content: post.content,
          author: new UserInfoVO(post.author),
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  async getPost(postId: string): Promise<IPostDTO> {
    try {
      const { data } = await this.connector.get<IPostDTO>(
        `/api/posts/${postId}`
      )

      if (!data) {
        return {} as IPostDTO
      }

      return new PostDTO({
        id: data.id,
        title: data.title,
        content: data.content,
        author: new UserInfoVO(data.author),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      })
    } catch (e) {
      console.error(e)
    }
  }

  async createPost(params: IRequestPostParams): Promise<boolean> {
    try {
      const { data } = await this.connector.post<boolean>("/api/posts", params)

      return data
    } catch (e) {
      console.error(e)
    }
  }

  async updatePost(
    postId: string,
    params: IRequestPostParams
  ): Promise<string> {
    try {
      const { data } = await this.connector.put<string>(
        `/api/posts/${postId}`,
        params
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }

  async deletePost(postId: string): Promise<boolean> {
    try {
      const { data } = await this.connector.delete<boolean>(
        `/api/posts/${postId}`
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }
}
