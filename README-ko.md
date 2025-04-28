# Clean Architecture for Frontend

클린 아키텍처는 `DDD(Domain-driven Design)`와 `MSA(Micro Service Architecture)`와 함께 많은 프로젝트에서 활용되고 있습니다. 이 프로젝트에서는 TypeScript를 사용하면서 동일한 도메인을 공유하는 다양한 웹 클라이언트 서비스를 모노레포 구성과 클린 아키텍처 설계를 통해서 서비스를 효과적으로 확장하거나 유지 보수를 용이하게 하는 하나의 아이디어 프로젝트입니다.

만약, 프로젝트가 단순한 UI를 다루는 작은 규모의 프로젝트이거나 API 서버가 클라이언트와 맞춤으로 대응되는 환경이라면 클린 아키텍처 도입은 오히려 보일러 플레이트 코드로 인한 코드량 증가와 복잡성 증가로 서비스의 유지 보수성이 나빠질 수 있습니다.

샘플 프로젝트는 Yarn에서 기본으로 제공하는 `Workspace`를 사용하여 모노레포를 구성하고, 패키지로 클린 아키텍처의 Domains 레이어와 Adapters 레이어를 구성하였고 각각의 서비스 역시 패키지로 구성하며 각 서비스는 Domains 레이어와 Adapters 레이어의 요소를 그대로 사용하거나 또는 상속, 확장하여 서비스를 구성합니다.

## Languages

- [English](https://github.com/falsy/clean-architecture-with-typescript)
- [한글](https://github.com/falsy/clean-architecture-with-typescript/blob/main/README-ko.md)

# Clean Architecture

![Alt Clean architecture](.github/images/clean-architecture.png#gh-light-mode-only)
![Alt Clean architecture](.github/images/clean-architecture-dark.png#gh-dark-mode-only)

다양한 아키텍처들이 그러하듯 클린 아키텍처가 갖는 기본 목적은 관심사를 분리하는 것입니다. 각의 관심사에 따라 계층을 나누고 세부 구현이 아닌 도메인 중심으로 설계하며, 내부 영역이 프레임워크나 데이터베이스, UI 등의 외부 요소에 의존하지 않도록 합니다.

- 세부 구현 영역과 도메인 영역을 구분합니다.
- 아키텍처는 프레임워크에 의존하지 않습니다.
- 외부 영역은 내부 영역에 의존할 수 있지만, 내부 영역은 외부 영역에 의존할 수 없습니다.
- 고수준, 저수준 모듈 모두 추상화에 의존합니다.

## Communitaction Flow

![Alt Communitaction Flow](.github/images/communication-flow.png#gh-light-mode-only)
![Alt Communitaction Flow](.github/images/communication-flow-dark.png#gh-dark-mode-only)

클린 아키텍처의 흐름을 간단하게 다이어그램으로 표현하면 위와 같습니다.

# Monorepo

![Alt Monorepo](.github/images/packages.png#gh-light-mode-only)
![Alt Monorepo](.github/images/packages-dark.png#gh-dark-mode-only)

모노레포는 Domains 레이어와 Adapters 레이어 그리고 서비스 레이어를 각각 패키지로 의존성을 명확하게 구분하였습니다.
그리고 루트에서는 TypeScript, ESLint, Jest의 기본 설정으로 하위 패키지에서는 확장하여 사용할 수 있습니다.

> 만약, 도메인을 공유하는 여러 서비스가 아닌 단일 서비스를 위한 구성이라면 모노레포를 사용하지 않고 Domains와 Adapters레이어를 각각 패키지에서 디렉토리로, 서비스 패키지는 Frameworks 디렉토리로 구성하여, 전체 프로젝트는 크게 Domians, Adapters, Frameworks로 나누고 이를 중심으로 설계할 수 있습니다.

# Directory Structure

```
/packages
├─ domains
│  └─ src
│     ├─ aggregates
│     ├─ entities
│     ├─ useCases
│     ├─ vos
│     ├─ repositories
│     │  └─ interface
│     └─ dtos
│        └─ interface
├─ adapters
│  └─ src
│     ├─ presenters
│     ├─ repositories
│     ├─ dtos
│     └─ infrastructures
│        └─ interface
├─ client-a(built with React)
│  └─ src
│     ├─ di
│     └─ ...
└─ client-b(built with Next.js)
   └─ src
      ├─ di
      └─ ...
```

## Tree Shaking

위 샘플 프로젝트에서는, 각각의 서비스 패키지에서 공용 패키지(`Domains`, `Adapters`, `그 밖의 추가될 수 있는 패키지들..`)를 사용할 때 빌드된 결과물을 참조하지 않고 `Source-to-Source` 방식으로 사용하고 있습니다. 이는 최종적으로 서비스의 모듈 번들러가 효과적으로 사용되지 않는 코드를 제거하고 사용할 수 있어야 하기 때문에, 공용 패키지는 모두 `ES Modules`로 작성해야 합니다.

> 대부분의 모듈 번들러는 ES Modules로 작성된 코드에 대해서 트리셰이킹을 기본으로 지원합니다.

# Domains

도메인 레이어에서는 비즈니스 규칙과 비즈니스 로직을 정의합니다.

샘플 프로젝트의 경우에는 간단한 포럼 서비스의 일부분으로 사용자가 글 목록을 보거나 글과 댓글을 작성할 수 있는 서비스입니다. 모노레포로 구성된 하나의 패키지로 Entity와 Use Case 그리고 Value Object 등의 정의하고, 다양한 서비스 패키지는 이를 사용하여 서비스를 구성합니다.

## Entities

Entity는 도메인 모델링의 핵심 개념 중 하나로, 고유한 식별자(Identity)를 통해 동일성을 유지하면서 상태와 행동을 가지는 객체입니다. Entity는 단순히 데이터를 보관하는 구조체가 아니라, 자신의 데이터를 직접 제어하고 관리하는 역할을 하며, 도메인 내에서 중요한 비즈니스 규칙과 로직을 표현합니다.

샘플 프로젝트에서는 Post, Comment, User 라는 3개의 엔티티로 구성되어 있습니다.

## Domain-driven Design(DDD)

클린 아키텍처는 DDD와 공통적으로 도메인 중심의 설계를 지향합니다. 클린 아키텍처는 소프트웨어의 구조적 유연성과 애플리케이션의 유지 보수, 그리고 기술의 독립성와 테스트 용이성에 중점을 두고 있으며 DDD는 비즈니스 문제 해결에 초점을 맞추고 있습니다.

하지만 클린 아키텍처는 DDD의 철학과 원칙을 일부 차용하고 있으며 DDD와 호환되며, DDD를 효과적으로 적용할 수 있습니다. 그리고 그 예로 클린 아키텍처는 DDD의 개념인 `Ubiquitous Language`와 `Aggregate Root`를 활용할 수 있습니다.

### Ubiquitous Language

![Ubiquitous Language](.github/images/ubiquitous.png#gh-light-mode-only)
![Ubiquitous Language](.github/images/ubiquitous-dark.png#gh-dark-mode-only)

유비쿼터스 언어는 프로젝트 전반에 걸쳐 의사소통의 일관성을 유지하기 위해 모든 팀원이 사용하는 공유 언어를 말합니다. 이 언어는 프로젝트 리더, 도메인 전문가, 개발자, UI/UX 디자이너, 비즈니스 분석가, QA 엔지니어 등을 포함한 모든 프로젝트 구성원이 공유해야 합니다. 그리고 이 언어는 협업 중 문서화나 대화에 사용될 뿐만 아니라 소프트웨어 모델과 코드에도 반영되어야 합니다.

### Aggregate Root

![Aggregate](.github/images/aggregate.png#gh-light-mode-only)
![Aggregate](.github/images/aggregate-dark.png#gh-dark-mode-only)

Aggregate는 여러 엔티티와 값 객체를 포함할 수 있는 일관성 경계로, 내부 상태를 캡슐화하여 외부에서의 접근을 제어합니다. 모든 수정은 반드시 Aggregate Root를 통해서만 이루어지며, 이는 모델 내의 관계 복잡성을 관리하고, 서비스 확장 및 트랜잭션 복잡성 증가 시 일관성을 유지하는 데 도움이 됩니다.

샘플 프로젝트에서는 Post가 Aggregate로 사용되었으며 하위에는 종속적인 관계의 Comment 엔티티가 있습니다. 그렇기에 Comment를 추가 및 변경하기 위해서는 Post를 통해서 이루어집니다. 그리고 Post의 속성으로 작성자 즉, 글을 작성한 사용자의 정보가 필요하지만 User는 독립적인 엔티티이기 때문에 얕은 관계를 유지하기 위하여 User의 id 값과 name 정보만을 Value Object로 가지고 있습니다.

## Use Cases

Use Case는 사용자와 서비스 간의 상호작용을 정의하며, 도메인 객체(Entity, Aggregate, Value Object)를 활용하여 서비스가 사용자에게 제공해야 하는 비즈니스 기능을 명확하게 합니다. 시스템 아키텍처 관점에서 Use Case는 애플리케이션 로직과 비즈니스 규칙을 분리하는 역할을 하며, 직접적으로 비즈니스 로직을 제어하기보다는 도메인 객체가 가진 비즈니스 규칙과 로직을 활용할 수 있도록 돕습니다.

샘플 프로젝트에서는 간단하게 전체 요약 글 리스트를 가져오거나 글과 댓글을 추가, 삭제, 변경과 같은 간단한 상호 작용으로 구성되어 있습니다.

## Inversion of Control

![Alt Inversion Of Control](.github/images/inversion-of-control.png#gh-light-mode-only)
![Alt Inversion Of Control](.github/images/inversion-of-control-dark.png#gh-dark-mode-only)

Repository의 경우 Adapter 레이어에 해당하기 때문에 Use Case에서는 Repository에 대해서 알아서는 안됩니다. 그렇기 때문에 Use Case에서는 Repository를 추상화한 인터페이스를 가지고 구현하며, 이는 이후에 `의존성 주입(DI: Dependency Injection)`를 통해 동작합니다.

# Adapters

Domains 계층과 유사하게 Adatpers 계층도 모노레포 내에서 단일 패키지로 구성하여 사용합니다. Apapter에서는 일반적으로 Presenters, Repositories 및 Infrastructure 구성 요소가 포함됩니다. 이러한 구성 요소는 의존성 주입(DI)을 통해 서비스 패키지에서 사용되며 필요에 따라 상속하고 사용자 정의하여 확장할 수 있습니다.

## Infrastructures

Infrastructure 레이어에서는 웹 서비스에서 일반적으로 많이 사용하는 HTTP를 사용한 외부 서버와의 통신이나 또는 LocalStorage와 같은 브라우저의 Web API와 같은 애플리케이션 외부와의 연결을 관리합니다.

## Repositories

일반적으로 백엔드에서 Repository 레이어는 데이터베이스와 관련된 `CRUD` 작업을 수행하며 데이터의 저장, 조회, 수정, 삭제와 같은 기본적인 데이터 조작을 처리합니다. 그리고 그러한 데이터베이스와의 상호작용을 추상화하여 비즈니스 로직에서 데이터 저장소에 대해 알 필요가 없도록 합니다.

같은 원리로 샘플 프로젝트에서 Repository 레이어는 API 서버와의 HTTP 통신에 관련된 POST, GET, PUT, DELETE 작업을 수행하며 그 상호작용을 추상화하여 비즈니스 로직에서는 데이터의 출처에 대해서 알 필요가 없도록 합니다. 그리고 외부 서버로부터 받은 데이터는 `DTO`로 캡슐화하여 이 데이터가 클라이언트 내부에서 사용될 때의 안정성을 보장합니다.

## Presenters

Presenters 레이어에서는 UI에서 필요로하는 메서드를 가지고 사용자의 요청을 서버로 전달하는 역할을 하며, 요청에 따라 엔티티 데이터를 UI에서 사용되는 View Model로 값을 변환하여 응답하는 역할을 하기도 합니다.

## Dependency Injection

![Alt Dependency Injection](.github/images/dependency-injection.png#gh-light-mode-only)
![Alt Dependency Injection](.github/images/dependency-injection-dark.png#gh-dark-mode-only)

각각의 레이어는 최종적으로 의존성 주입(Dependency Injection)을 통해 동작합니다. 예로 들면, 각 레이어별로 인터페이스를 정의하고 이 인터페이스를 기반으로 다양한 구현체를 만들어 필요에 따라 주입하여 사용합니다.

샘플 프로젝트에서는 Repository 인터페이스를 정의하고, 이를 구현하는 NetworkRepository(HTTP 통신)와 StorageRepository(웹 스토리지 사용)를 구성한 뒤, 서비스에 따라 선택적으로 주입하여 사용하고 있습니다.

이처럼 의존성 주입을 통한 서비스 구성은 역할과 책임을 명확히 나누어 수정 범위를 최소화할 수 있으며, 추상화에 의존하는 설계를 통해 새로운 구현체를 추가하여 높은 확장성과 유연성을 가진 서비스를 개발할 수 있습니다.

> 일반적으로 HTTP 통신과 웹 스토리지는 각기 다른 역할을 하므로, 샘플 프로젝트처럼 두 구현체를 같은 동작으로 정의하고 선택적으로 사용하는 경우는 드뭅니다. 이 예시는 단순히 다양한 구현체를 정의하고 그 차이를 보여주기 위한 목적으로 사용되었습니다.

# Services

샘플 프로젝트의 클라이언트 서비스는 Client-A, Client-B 이렇게 2개의 간단한 서비스로 구성되어 있습니다. 두 서비스 모두 동일한 도메인 기반의 서비스로 UI 컴포넌트는 [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)을 기반으로 설계하였습니다.

## Client-A

### Use Stack

```
Vite, React, Jotai, Tailwind CSS, Jest, RTL, Cypress
```

Client-A는 `Domains`와 `Adapters` 레이어의 요소들을 그대로 사용해서 최종적으로 `DI`된 상위 레이어의 객체를 React의 Hooks와 전역 상태 라이브러리인 [Jotai](https://jotai.org/)를 활용하여 각 도메인의 메서드를 구현하고 이는 Presenters 레이어의 역할을 수행합니다.

> 기존에 Adapters 패키지에서 Presenters 디렉토리로 명시적으로 Presenters 레이어를 나누었지만 이는 프레임워크에 의존하지 않은 범용적인 Presenters이며, 위 샘플 프로젝트처럼 React를 사용하는 서비스에서는 그에 부합하는 구성을 위해서 최종적으로 의존성을 주입한 Presenters 객체와 React Hooks을 활용하여 Presenters 영역을 확장 구성하였습니다.

### Dependency Injection

```tsx
import { API_URL } from "../constants"
import infrastructuresFn from "./infrastructures"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import presentersFn from "./presenters"

export default function di(apiUrl = API_URL) {
  const infrastructures = infrastructuresFn(apiUrl)
  const repositories = repositoriesFn(infrastructures)
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  return presenters
}
```

### Presenters

```tsx
import { useCallback, useMemo, useOptimistic, useState, useTransition } from "react"
import { atom, useAtom } from "jotai"
import presenters from "../di"
import PostVM from "../vms/PostVM"
import IPostVM from "../vms/interfaces/IPostVM"

const PostsAtoms = atom<IPostVM[]>([])

export default function usePosts() {
  const di = useMemo(() => presenters(), [])

  const [post, setPost] = useState<IPostVM>(null)
  const [posts, setPosts] = useAtom<IPostVM[]>(PostsAtoms)
  const [optimisticPost, setOptimisticPost] = useOptimistic(post)
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts)
  const [isPending, startTransition] = useTransition()

  const getPosts = useCallback(async () => {
    startTransition(async () => {
      const resPosts = await di.post.getPosts()
      const postVMs = resPosts.map((post) => new PostVM(post))
      setPosts(postVMs)
    })
  }, [di.post, setPosts])

  ...
}
```

### View Models

Client-A에서는 프로젝트 레이어에서 React의 UI 상태 관리에 적합하도록 View Model을 구성하여 사용하였습니다.

```ts
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
```

View Model에서는 위와 같이 값 변경에 따른 메서드를 제공하며(e.g., updateContent) 모든 변경에는 updatedAt 값이 함께 변경하고, updatedAt 값과 ID 값을 활용하여 고유한 `Key` 값을 만들어 사용함으로써 React가 View의 변경을 감지하고 리렌더링 할 수 있도록 하였습니다.

```tsx
...

export default function usePosts() {
  ...

  const deleteComment = useCallback(
    async (commentId: string) => {
      startTransition(async () => {
        setOptimisticPost((prevPost) => {
          prevPost.deleteComment(commentId)
          return prevPost
        })

        try {
          const isSucess = await di.post.deleteComment(commentId)
          if (isSucess) {
            const resPost = await di.post.getPost(optimisticPost.id)
            const postVM = new PostVM(resPost)
            setPost(postVM)
          }
        } catch (e) {
          console.error(e)
        }
      })
    },
    [di.post, optimisticPost, setOptimisticPost, setPost]
  )

  ...
}
```

Presenter 레이어의 Hooks에서도 위와 같이 Comment의 삭제 요청에 대한 간단한 예시로, VM에서 제공하는 메서드를 활용하여 낙관적 업데이트를 구현하고 요청이 성공하면 위 변경이 적용된 새로운 데이터를 요청하여 동기화 하도록 하였습니다.

## Client-B

### Use Stack

```
Next.js, Jotai, Tailwind CSS, Jest, RTL, Cypress
```

Client-B는 Client-A와 동일한 도메인을 활용한, 서비스 확장을 표현하는 서비스로 Client-A 서비스와 유사하지만 Client-A 서비스와 다르게 Next.js를 기반으로 하며 기존의 Client-A 서비스는 API 서버와의 HTTP 통신을 통해 데이터를 조작하지만 Client-B는 HTTP 통신 없이 로컬 저장소(Local Storage)를 기반으로 동작하는 차이가 있습니다.

Client-A와 같은 `Domains` 레이어와 `Adpaters` 레이어에서 정의한 인터페이스와 구현체를 활용하여 높은 코드 재사용성을 가지고 구성할 수 있습니다. 또한, 의존성 주입(DI) 과정에서 HTTP 통신을 사용하는 Repository를 대신하여 웹 스토리지를 사용하는 Repository를 사용하는 것만으로 간단하게 새로운 서비스를 구현할 수 있습니다.

> Client-B는 구제적인 기능 구현보다는 동일한 도메인을 활용한 다른 클라이언트 서비스 구성에 대한 간단한 예시입니다.

## Design System

샘플 서비스처럼 각 서비스가 동일한 프레임워크를 사용한다면, 모노레포 구성의 장점을 활용하여 공통으로 사용 가능한 UI 컴포넌트를 별도의 패키지로 구성함으로써 컴포넌트의 재사용성을 높여 더욱 효과적으로 서비스를 확장 및 유지 보수할 수도 있습니다.

# 실행

샘플 프로젝트는 루트에 등록된 커맨드를 활용하여 각 패키지를 빌드 또는 실행할 수 있습니다.

## 설치

```sh
$ yarn install
```

## 실행

```sh
# client-a
$ yarn start:a

# client-b
$ yarn start:b
```

# Thank You!

모든 지원과 관심에 감사드립니다. 🙇‍♂️
