import express from "express";


const app = express()
const port = Number(process.env.PORT) || 8080

app.get("/.well-known/fastly/logging/challenge", (req, res) => {
    const services = process.env.FASTLY_HASHED_SERVICES;
    if(services) {
      res.status(200).end(services.split(",").join("\n"))
    } else {
      res.status(200).send("*");
    }
})
app.use(express.text())
app.post("*", (req, res) => {
    console.log(req.body)
    res.status(200).json({ok: true})
})

app.listen(port, () => console.log(`APP is listening on ${port}`))
