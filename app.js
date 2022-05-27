const express = require("express");
const app = express()
const mongoose = require("mongoose");
const indexRoute = require("./routes/index")
const usersRoute = require("./routes/users")
const config = require("./config/config")

const url = config.bd_string;

mongoose.connect(url);
mongoose.connection.on("error", () => {
    console.log("Erro na conexão com o banco de dados")
})

mongoose.connection.on("disconnected", () => {
    console.log("Banco de dados desconectado")
})

mongoose.connection.on("connected", () => {
    console.log("Banco de dados conectado!")
})

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(3000, () => {
    console.log("Server is up!");
})

module.exports = app;