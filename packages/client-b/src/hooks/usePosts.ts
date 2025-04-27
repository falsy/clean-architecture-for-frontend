/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useMemo, useOptimistic, useTransition } from "react"
import { atom, useAtom } from "jotai"
import IPost from "domains/aggregates/interfaces/IPost"
import presenters from "../di"

const PostsAtoms = atom<IPost[]>([])

export default function usePosts() {
  const di = useMemo(() => presenters(globalThis.localStorage), [])

  const [posts, setPosts] = useAtom<IPost[]>(PostsAtoms)
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts)
  const [isPending, startTransition] = useTransition()

  const getPosts = useCallback(async () => {
    startTransition(async () => {
      const resPosts = await di.post.getPosts()
      setPosts(resPosts)
    })
  }, [di.post, setPosts])

  const createPost = useCallback(
    async (title: string, content: string) => {
      startTransition(async () => {
        const isSucess = await di.post.createPost({ title, content })
        if (isSucess) {
          const resPosts = await di.post.getPosts()
          setPosts(resPosts)
        }
      })
    },
    [di.post, setPosts]
  )

  const deletePost = useCallback(
    async (postId: string) => {
      startTransition(async () => {
        setOptimisticPosts((prevPosts) => {
          return prevPosts.filter((post) => post.id !== postId)
        })

        try {
          const isSucess = await di.post.deletePost(postId)
          if (isSucess) {
            const resPosts = await di.post.getPosts()
            setPosts(resPosts)
          }
        } catch (e) {
          console.error(e)
        }
      })
    },
    [di.post, setOptimisticPosts, setPosts]
  )

  return {
    isPending,
    posts: optimisticPosts,
    getPosts,
    createPost,
    deletePost
  }
}
