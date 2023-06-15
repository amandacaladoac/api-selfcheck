const mongoose = require("mongoose")

async function main() {
    try {

      mongoose.set("strictQuery", true); 

      await  mongoose.connect ("mongodb+srv://amandabcalado:KS3pN1yIPWv2yCeL@cluster0.bqzrxdd.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

        console.log("Concetado ao banco!");
    } catch (error) {
        console.log('Erro: ${error}')
    }
}

module.exports = main