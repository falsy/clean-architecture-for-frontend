import IConnector from "adapters/infrastructures/interfaces/IConnector"
import IPostDTO from "domains/dtos/interfaces/IPostDTO"
import IPostRepository from "domains/repositories/interfaces/IPostRepository"
import { IRequestPostParams } from "domains/aggregates/interfaces/IPost"
import UserInfoVO from "domains/vos/UserInfoVO"
import PostDTO from "adapters/dtos/PostDTO"

export default class PostRepository implements IPostRepository {
  private connector: IConnector

  constructor(connector: IConnector) {
    this.connector = connector
  }

  async getPosts(): Promise<IPostDTO[]> {
    try {
      const { data } = await this.connector.get<IPostDTO[]>("posts")

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
      const data = await this.getPosts()
      const findPost = data.find((post) => post.id === postId)

      if (!data) {
        return {} as IPostDTO
      }

      return findPost
    } catch (e) {
      console.error(e)
    }
  }

  async createPost(params: IRequestPostParams): Promise<boolean> {
    try {
      const newPost = new PostDTO({
        id: String(Date.now()),
        title: params.title,
        content: params.content,
        author: new UserInfoVO({
          userId: "1",
          userName: "falsy"
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      const data = await this.getPosts()

      const { data: isSucess } = await this.connector.post<boolean>(
        "posts",
        data.concat(newPost)
      )

      return isSucess
    } catch (e) {
      console.error(e)
    }
  }

  async updatePost(
    postId: string,
    params: IRequestPostParams
  ): Promise<string> {
    try {
      const data = await this.getPosts()
      const updateAt = new Date().toISOString()
      const newPosts = data.map((post) => {
        if (post.id === postId) {
          post.title = params.title
          post.content = params.content
          post.updatedAt = updateAt
        }
        return post
      })

      const { data: isSucess } = await this.connector.put<boolean>(
        "posts",
        newPosts
      )

      return isSucess ? updateAt : ""
    } catch (e) {
      console.error(e)
    }
  }

  async deletePost(postId: string): Promise<boolean> {
    try {
      const data = await this.getPosts()
      const filter = data.filter((post) => post.id !== postId)

      const { data: isSucess } = await this.connector.put<boolean>(
        "posts",
        filter
      )

      return isSucess
    } catch (e) {
      console.error(e)
    }
  }
}
