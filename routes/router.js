const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController")
// Usuario router
const usuarioRouter = require("./usuario")

router.use("/", usuarioRouter)

module.exports = router;