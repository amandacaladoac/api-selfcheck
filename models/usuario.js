const mongoose = require("mongoose");
const argon2 = require('argon2');


const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    matricula: {
        type: Number,
    },
    senha: {
        type: String,
        required: true
    },
    checkin: {
        type: Number,
        default: 0
    },
    pontos: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


usuarioSchema.methods.fazerCheckin = function () {
    this.checkin += 1;
    this.pontos += 10;
    return this.save();
};

usuarioSchema.methods.verificarSenha = async function (senha) {
    try {
        // Removendo a verificação da senha
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema,
}