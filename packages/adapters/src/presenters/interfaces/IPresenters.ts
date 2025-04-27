import IPostPresenter from "./IPostPresenter"
import IUserPresenter from "./IUserPresenter"

export default interface IPresenters {
  post: IPostPresenter
  user: IUserPresenter
}
