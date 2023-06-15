const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        return await bcrypt.compare(senha, this.senha);
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