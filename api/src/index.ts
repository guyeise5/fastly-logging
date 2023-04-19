import express from "express"
import { services } from "./services"
import { Queue } from "./buffer"
import cors from 'cors'
import path from 'path'
import auth from './auth'
const buffer = new Queue<{ date: Date, message: any }>()

const maxSize = Number(process.env.BUFFER_MAX_SIZE) || 1000
const app = express()
const port = Number(process.env.PORT) || 8080
app.use(cors())
app.get("/.well-known/fastly/logging/challenge", (_, res) => {
  res.status(200).send(services().join("\n"))
})

app.get("/api/v1/log", auth, (_, res) => {
  res.status(200).json(buffer.toArray());
})

app.post("/api/v1/clear", auth, (_, res) => {
  buffer.clear()
  res.status(200).json({ ok: 1 })
})

app.use(express.json())
app.use(express.text())
app.post("*", auth, (req, res) => {
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


app.listen(port, () => console.log(`
============================================================================
Web UI is available at http://localhost:${port}
Host to configure in Fastly logger: https://<external-domain>/api/v1/log
Source code https://github.com/Guyeise1/fastly-logging
============================================================================

`))
