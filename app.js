const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn();

// Router
const routes = require("./routes/router")

app.use("/api", routes);


// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
