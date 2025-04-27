import IUserRepository from "domains/repositories/interfaces/IUserRepository"
import IUserDTO from "domains/dtos/interfaces/IUserDTO"
import IConnector from "../infrastructures/interfaces/IConnector"
import UserDTO from "../dtos/UserDTO"

export default class UserRepository implements IUserRepository {
  private connector: IConnector

  constructor(connector: IConnector) {
    this.connector = connector
  }

  async getUser(): Promise<IUserDTO> {
    try {
      const { data } = await this.connector.get<IUserDTO>("/api/users")

      if (!data) {
        return {} as IUserDTO
      }

      return new UserDTO(data)
    } catch (e) {
      console.error(e)
    }
  }
}
