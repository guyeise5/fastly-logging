import express from "express";
import { services } from "./services";


const app = express()
const port = Number(process.env.PORT) || 8080

app.get("/.well-known/fastly/logging/challenge", (_, res) => {
  res.status(200).send(services().join("\n"))
})
app.use(express.text())
app.post("*", (req, res) => {
    console.log(req.body)
    res.status(200).json({ok: true})
})

app.listen(port, () => console.log(`APP is listening on ${port}`))
