const mongoose = require("mongoose");


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

usuarioSchema.methods.verificarSenha = function (senha) {
    // Comparar a senha fornecida com a senha armazenada no modelo do usuário
    return this.senha === senha;
};

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema,
}