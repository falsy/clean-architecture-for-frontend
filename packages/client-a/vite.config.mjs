import path from "path"
import { defineConfig } from "vite"
import express from "express"
import react from "@vitejs/plugin-react"

export default defineConfig({
  resolve: {
    alias: {
      domains: path.resolve(__dirname, "../domains/src/"),
      adapters: path.resolve(__dirname, "../adapters/src/")
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  },
  plugins: [
    react(),
    {
      name: "vite-express-mock-api",
      configureServer(server) {
        const app = express()
        const posts = []
        const comments = []

        app.use(express.json())

        app.get("/api/posts", (req, res) => {
          setTimeout(() => {
            res.json(posts)
          }, 200)
        })

        app.delete("/api/posts/:postId", (req, res) => {
          setTimeout(() => {
            const index = posts.findIndex(
              (post) => post.id === req.params.postId
            )
            posts.splice(index, 1)
            res.json(true)
          }, 200)
        })

        app.post("/api/posts", (req, res) => {
          setTimeout(() => {
            posts.push({
              id: String(Date.now()),
              title: req.body.title,
              content: req.body.content,
              author: {
                userId: "1",
                userName: "sample"
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
            res.json(true)
          }, 200)
        })

        app.put("/api/posts/:postId", (req, res) => {
          setTimeout(() => {
            const index = posts.findIndex(
              (post) => post.id === req.params.postId
            )
            const updatedAt = new Date().toISOString()
            posts[index] = {
              ...posts[index],
              title: req.body.title,
              content: req.body.content,
              updatedAt
            }
            res.json(updatedAt)
          }, 200)
        })

        app.get("/api/posts/:postId", (req, res) => {
          setTimeout(() => {
            res.json(posts.find((post) => post.id === req.params.postId))
          }, 200)
        })

        app.get("/api/posts/:postId/comments", (req, res) => {
          setTimeout(() => {
            res.json(
              comments.filter((comment) => comment.postId === req.params.postId)
            )
          }, 200)
        })

        app.delete("/api/comments/:commentId", (req, res) => {
          setTimeout(() => {
            const index = comments.findIndex(
              (comment) => comment.id === req.params.commentId
            )
            comments.splice(index, 1)
            res.json(true)
          }, 200)
        })

        app.post("/api/posts/:postId/comments", (req, res) => {
          setTimeout(() => {
            comments.push({
              id: String(Date.now()),
              postId: req.params.postId,
              content: req.body.content,
              author: {
                userId: "1",
                userName: "sample"
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
            res.json(true)
          }, 200)
        })

        server.middlewares.use(app)
      }
    }
  ],
  server: {
    port: 4000,
    open: true,
    historyApiFallback: true
  }
})
