import express from "express";
import { services } from "./services";
import { Queue } from "./buffer";
import cors from 'cors';

const buffer = new Queue<{ date: Date, message: string }>();

const maxSize = Number(process.env.BUFFER_MAX_SIZE) || 1000;
const app = express()
const port = Number(process.env.PORT) || 8080
app.use(cors())
app.get("/.well-known/fastly/logging/challenge", (_, res) => {
  res.status(200).send(services().join("\n"))
})

app.get("/api/v1/log", (_, res) => {
  res.status(200).json(buffer.toArray());
})

app.use(express.text())
app.post("*", (req, res) => {
  console.log(req.body)
  buffer.push({ date: new Date(), message: req.body })

  if (buffer.length > maxSize) {
    buffer.pop()
  }
  res.status(200).json({ ok: true })
})

app.listen(port, () => console.log(`APP is listening on ${port}`))
