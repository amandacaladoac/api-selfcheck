const { Usuario: UsuarioModel } = require("../models/usuario");
const crypto = require('crypto');

const usuarioController = {

    create: async (req, res) => {
        try {
            const { nome, email, matricula, senha } = req.body;

            if (!senha) {
                res.status(400).json({ error: "A senha é obrigatória." });
                return;
            }

            const hashedSenha = await argon2.hash(senha, 10);

            const usuario = {
                nome: nome,
                email: email,
                matricula: matricula,
                senha: hashedSenha,
            };

            const response = await UsuarioModel.create(usuario);

            res.status(201).json({ response, msg: "Cadastro realizado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "Erro ao criar usuário." });
        }
    },



    getAll: async (req, res) => {
        try {
            const usuario = await UsuarioModel.find();

            res.json(usuario);
        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {
            // id => URL === GET
            const id = req.params.id
            const usuario = await UsuarioModel.findById(id)

            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado." });
                return;
            }

            res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const usuario = await UsuarioModel.findById(id);

            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado." });
                return;
            }

            const deleteUsuario = await UsuarioModel.findByIdAndDelete(id)

            res.status(200).json({ deleteUsuario, msg: "Usuário excluído com sucesso." })

        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {

        const id = req.params.id

        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            matricula: req.body.matricula,
            senha: req.body.senha,
        };

        const updateUsuario = await UsuarioModel.findByIdAndUpdate(id, usuario)

        if (!updateUsuario) {
            res.status(404).json({ msg: "Usuário não encontrado." });
            return;
        }

        res.status(200).json({ usuario, msg: "Usuário atualizado com sucesso." })
    },

    fazerCheckin: async (req, res) => {
        try {
            const id = req.params.id;

            const usuario = await UsuarioModel.findById(id);

            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado." });
                return;
            }

            // Realize o check-in chamando o método fazerCheckin()
            usuario.fazerCheckin()
                .then((usuarioAtualizado) => {
                    res.json({ mensagem: "Check-in realizado com sucesso", usuario: usuarioAtualizado });
                })
                .catch((erro) => {
                    res.status(500).json({ mensagem: "Erro ao realizar o check-in", erro });
                });
        } catch (error) {
            console.log(error);
        }
    },

    login: async (req, res) => {
        try {
            const { email } = req.body;

            const usuario = await UsuarioModel.findOne({ email });

            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado." });
                return;
            }

            // Login bem-sucedido sem verificação de senha
            res.status(200).json({ msg: "Login realizado com sucesso.", usuario });
        } catch (error) {
            console.log(error);
        }
    },

};


module.exports = usuarioController;