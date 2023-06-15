const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController");

// Rota Enviar dados
router.route("/usuario").post((req, res) => usuarioController.create(req, res));

// Rota Ler todos os usuarios
router.route("/usuario").get((req, res) => usuarioController.getAll(req, res));

// Rota Ler de um usuario
router.route("/usuario/:id").get((req, res) => usuarioController.get(req, res));

// Rota deletar um usuario
router.route("/usuario/:id").delete((req, res) => usuarioController.delete(req, res));

// Rota editar usuario
router.route("/usuario/:id").put((req, res) => usuarioController.update(req, res));

// Rota para realizar checkin
router.route("/usuario/:id/checkin").put((req, res) => usuarioController.fazerCheckin(req, res));

//Rota para realizar login
router.route("/usuario/login").post((req, res) => usuarioController.login(req, res));

module.exports = router;