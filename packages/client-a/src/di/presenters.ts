import IUseCases from "domains/useCases/interfaces/IUseCases"
import IPresenters from "adapters/presenters/interfaces/IPresenters"
import PostPresenter from "adapters/presenters/PostPresenter"
import UserPresenter from "adapters/presenters/UserPresenter"

export default (useCases: IUseCases): IPresenters => {
  return {
    post: new PostPresenter(useCases.post),
    user: new UserPresenter(useCases.user)
  }
}
