import express from "express"
import { services } from "./services"
import { Queue } from "./buffer"
import cors from 'cors'
import path from 'path'
const buffer = new Queue<{ date: Date, message: any }>()

const maxSize = Number(process.env.BUFFER_MAX_SIZE) || 1000
const app = express()
const port = Number(process.env.PORT) || 8080
const auth = process.env.AUTH_TOKEN
app.use(cors())
app.get("/.well-known/fastly/logging/challenge", (_, res) => {
  res.status(200).send(services().join("\n"))
})

app.use("*", (req, res, next) => {
  if (!auth || req.headers.authorization === auth) {
    next()
  } else {
    res.status(401).json({ ok: 0, message: "unauthorized" })
  }
})

app.get("/api/v1/log", (_, res) => {
  res.status(200).json(buffer.toArray());
})

app.post("/api/v1/clear", (_, res) => {
  buffer.clear()
  res.status(200).json({ ok: 1 })
})

app.use(express.json())
app.use(express.text())
app.post("*", (req, res) => {
  if (Array.isArray(req.body)) {
    req.body.forEach(msg => {
      buffer.push({ date: new Date(), message: msg })
      console.log(msg)
    })
  } else {
    buffer.push({ date: new Date(), message: req.body })
  }

  while (buffer.length > maxSize) {
    buffer.pop()
  }
  res.status(200).json({ ok: 1 })
})

app.use(express.static(path.join(__dirname, "../../client/build")))


app.listen(port, () => console.log(`APP is running on http://localhost:${port}`))
