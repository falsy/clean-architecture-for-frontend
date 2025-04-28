# Clean Architecture for Frontend

Clean Architecture is widely used in many projects alongside `DDD(Domain-driven Design)` and `MSA(Microservice Architecture)`. This project is an idea-driven initiative that leverages TypeScript, a monorepo setup, and Clean Architecture to effectively scale and maintain various web client services that share the same domain.

However, if the project is a small-scale application that primarily focuses on simple UI, or if the API server is tightly coupled with the client, adopting Clean Architecture might negatively impact maintainability due to increased code complexity and boilerplate code.

In this sample project, a monorepo is structured using `Workspaces` provided by Yarn. The monorepo consists of the Domains and Adapters layers as separate packages, while each service is also packaged individually. These services directly utilize, extend, or inherit elements from the Domains and Adapters layers to build their respective implementations.

#### Note.

> \+ My English is not perfect, so please bear with me.

## Languages

- [English](https://github.com/falsy/clean-architecture-with-typescript)
- [한글](https://github.com/falsy/clean-architecture-with-typescript/blob/main/README-ko.md)

# Clean Architecture

![Alt Clean architecture](.github/images/clean-architecture.png#gh-light-mode-only)
![Alt Clean architecture](.github/images/clean-architecture-dark.png#gh-dark-mode-only)

As with many architectures, the primary goal of Clean Architecture is to separate concerns. It divides layers according to each concern, designs around the domain rather than detailed implementations, and ensures the inner layers do not depend on external elements like frameworks, databases, or UIs.

- Separate the detailed implementation area and the domain area.
- The architecture does not depend on the framework.
- The outer layers can depend on the inner layers, but the inner layers cannot depend on the outer layers.
- Both high-level and low-level modules depend on abstractions.

## Communitaction Flow

![Alt Communitaction Flow](.github/images/communication-flow.png#gh-light-mode-only)
![Alt Communitaction Flow](.github/images/communication-flow-dark.png#gh-dark-mode-only)

The flow of Clean Architecture can be briefly illustrated in the diagram above.

# Monorepo

![Alt Monorepo](.github/images/packages.png#gh-light-mode-only)
![Alt Monorepo](.github/images/packages-dark.png#gh-dark-mode-only)

In the monorepo structure, the Domains layer, Adapters layer, and Service layer are clearly separated into individual packages with well-defined dependencies. At the root level, basic configurations for TypeScript, ESLint, and Jest are provided, which can be extended and used in the lower-level packages.

> If the project is for a single service rather than multiple services sharing the same domain, a monorepo is not necessary. Instead, the Domains and Adapters layers can be structured as directories rather than separate packages, while the service package can be placed in the Frameworks directory. This allows the entire project to be organized into three main sections: Domains, Adapters, and Frameworks, forming the core of the architecture.

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

In this sample project, service packages use shared packages (`Domains`, `Adapters`, `and other potential packages`) through a `Source-to-Source` approach, rather than referencing pre-built outputs. This approach ensures that the service's module bundler can effectively eliminate unused code during the final build. Therefore, all shared packages must be written using `ES Modules`.

> Most module bundlers natively support tree shaking for code written in ES Modules.

# Domains

The domain layer defines business rules and business logic.

In the sample project, it represents a simple forum service where users can view a list of posts or create posts and comments. It is structured as a single package within a monorepo, containing definitions for Entities, Use Cases, and Value Objects. Various service packages utilize these definitions to build their respective functionalities.

## Entities

Entities are one of the core concepts in domain modeling, representing objects that maintain a unique identity and contain both state and behavior. An Entity is not just a data holder but is responsible for controlling and managing its data. It encapsulates important business rules and logic within the domain.

In the sample project, there are three entities: Post, Comment, and User.

## Domain-driven Design(DDD)

Clean Architecture shares a common goal with DDD in pursuing domain-centric design. While Clean Architecture focuses on structural flexibility, maintainability, technological independence, and testability of software, DDD emphasizes solving complex business problems.

However, Clean Architecture adopts some of DDD's philosophy and principles, making it compatible with DDD and providing a framework to effectively implement DDD concepts. For example, Clean Architecture can leverage DDD concepts such as `Ubiquitous Language` and `Aggregate Root`.

### Ubiquitous Language

![Ubiquitous Language](.github/images/ubiquitous.png#gh-light-mode-only)
![Ubiquitous Language](.github/images/ubiquitous-dark.png#gh-dark-mode-only)

Ubiquitous Language refers to a shared language used by all team members to maintain consistent communication throughout a project. This language should be shared by everyone involved, including project leaders, domain experts, developers, UI/UX designers, business analysts, and QA engineers. It should not only be used in documentation and discussions during collaboration but also be reflected in the software model and code.

### Aggregate Root

![Aggregate](.github/images/aggregate.png#gh-light-mode-only)
![Aggregate](.github/images/aggregate-dark.png#gh-dark-mode-only)

An Aggregate is a consistency boundary that can include multiple entities and value objects. It encapsulates internal state and controls external access. All modifications must go through the Aggregate Root, which helps manage the complexity of relationships within the model and maintain consistency when services expand or transactions become more complex.

In the sample project, Post serves as an Aggregate, with the Comment entity having a dependent relationship on it. Therefore, adding or modifying a comment must be done through the Post entity. Additionally, while the Post entity requires information about the author (the User who wrote the post), the User is an independent entity. To maintain a loose relationship, only the User's id and name are included as a Value Object within Post.

## Use Cases

Use Cases define the interactions between users and the service, leveraging domain objects such as Entities, Aggregates, and Value Objects to deliver business functionality to users. From a system architecture perspective, Use Cases help separate application logic from business rules. Rather than directly controlling business logic, Use Cases facilitate interaction with the domain objects, allowing them to enforce business rules and logic.

In the sample project, Use Cases include simple interactions such as retrieving a summarized list of posts, and adding, deleting, or modifying posts and comments.

## Inversion of Control

![Alt Inversion Of Control](.github/images/inversion-of-control.png#gh-light-mode-only)
![Alt Inversion Of Control](.github/images/inversion-of-control-dark.png#gh-dark-mode-only)

Since the Repository belongs to the Adapter layer, the higher-level Use Case should not directly depend on it. Therefore, in the Use Case, an abstract interface for the Repository is implemented, which is later handled through `Dependency Injection(DI)`.

# Adapters

Similar to the domain layer, the adapters are also organized as a single package within the monorepo. The adapter layer typically includes Presenters, Repositories, and Infrastructure components. These are used in service packages through dependency injection (DI) and can be extended by inheriting and customizing them as needed.

## Infrastructures

The Infrastructure layer manages external connections such as communication with external servers via HTTP or interactions with browser APIs like LocalStorage, which are commonly used in web services.

## Repositories

In a typical backend, the Repository layer handles CRUD operations related to databases, such as storing, retrieving, modifying, and deleting data. It abstracts database interactions so that the business logic does not need to be aware of the underlying data store.

Similarly, in the sample project, the Repository layer performs POST, GET, PUT, and DELETE operations for HTTP communication with the API server. It abstracts these interactions so the business logic is not concerned with where the data originates. Data retrieved from external servers is encapsulated as DTOs (Data Transfer Objects) to ensure stability when used internally within the client.

## Presenters

The Presenter layer handles requests from the UI, forwarding them to the server. It also converts entity data into View Models used in the UI, responding appropriately based on user requests.

## Dependency Injection

![Alt Dependency Injection](.github/images/dependency-injection.png#gh-light-mode-only)
![Alt Dependency Injection](.github/images/dependency-injection-dark.png#gh-dark-mode-only)

Each layer ultimately operates through Dependency Injection. For example, interfaces are defined for each layer, and various implementations are created based on these interfaces, which are then injected as needed.

In the sample project, a Repository interface is defined, and two implementations, NetworkRepository (for HTTP communication) and StorageRepository (for web storage), are created. These are then injected into services based on the requirements.

This approach to service configuration through Dependency Injection helps clearly define roles and responsibilities, minimizing the scope of changes. By relying on abstraction in the design, new implementations can be easily added, allowing for highly scalable and flexible service development.

> Typically, HTTP communication and web storage serve different purposes, so it is uncommon to define and selectively use two implementations in the same way as in the sample project. This example was simply used to demonstrate the differences between various implementations.

# Services

The sample project's client services consist of two simple services: client-a and client-b. Both services are built based on the same domain-driven architecture, and their UI components are designed following the principles of [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).

## Client-A

### Use Stack

```
Vite, React, Jotai, Tailwind CSS, Jest, RTL, Cypress
```

Client-A directly utilizes elements from the `Domains` and `Adapters` layers and implements methods for each domain using React hooks and the global state management library [Jotai](https://jotai.org/). These methods act as the Presenters layer in the final service.

> Previously, the Adapters package explicitly included a Presenters directory to represent a framework-agnostic Presenters layer. However, in services like this sample project that use React, we extend the Presenters layer by injecting dependencies into the final Presenters objects and utilizing React hooks to achieve a composition that aligns with the framework.

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

In Client-A, we structured the View Model in the project layer to effectively manage UI state in React.

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

The View Model provides methods to handle value changes (e.g., updateContent). Whenever a value is updated, the updatedAt field is also modified. By using a combination of the updatedAt value and the ID, we generate a unique `key` that allows React to detect changes in the view and trigger re-renders as needed.

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

In the Presenter layer's hooks, we implemented optimistic updates using the methods provided by the View Model. For instance, when sending a delete request for a comment, we immediately apply the changes locally. After the request succeeds, we fetch the updated data to synchronize the state.

## Client-B

### Use Stack

```
Next.js, Jotai, Tailwind CSS, Jest, RTL, Cypress
```

Client-B is a service that represents an extension of the service, using the same domain as Client-A. While similar to Client-A, Client-B is built on Next.js, whereas Client-A operates through HTTP communication with an API server to manipulate data. In contrast, Client-B operates based on local storage (Local Storage) without HTTP communication.

By utilizing the interfaces and implementations defined in the Domains and Adapters layers, similar to Client-A, Client-B can be structured with high code reusability. Additionally, during the dependency injection (DI) process, a simple switch from using a repository that communicates via HTTP to one that uses local storage makes it easy to implement a new service.

> Client-B serves as a simple example of structuring another client service using the same domain, rather than focusing on the specific functionality of the service.

## Design System

When services use the same framework, as in this sample project, the advantages of a monorepo setup can be leveraged by creating a separate package for shared UI components. This increases component reusability, making it easier to expand and maintain services more efficiently.

# Run

You can build or run each package in the sample project using the commands registered at the root.

## Install

```sh
$ yarn install
```

## Start

```sh
# client-a
$ yarn start:a

# client-b
$ yarn start:b
```

# Thank You!

I'm grateful for all the support and interest 🙇‍♂️
