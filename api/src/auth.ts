const auth = process.env.AUTH_TOKEN

export default (req, res, next) => {
    if (!auth || req.headers.authorization === auth) {
        next()
      } else {
        res.status(401).json({ ok: 0, message: "unauthorized" })
      }
}