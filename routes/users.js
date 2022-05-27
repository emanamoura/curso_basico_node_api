const bcrypt = require("bcrypt");
const express = require("express");
const Users = require("../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { jwt_expires } = require("../config/config");

router.get("/", async (req, res) => {
    try {
        const  users = await Users.find({});
        return res.send(users) 
    } catch (error) {
        return res.status(500).send({erro: "Erro na consulta de usuários"})
    }
})

const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, config.jwt_pass, { expiresIn: jwt_expires})
}

router.post("/create", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Dados insuficientes" })
    }

    try {
        if (await Users.findOne({ email })) {
            return res.status(400).send({ err: "Usuário já existe" })
        }

        const user =  await Users.create({ email, password })
        user.password = undefined;
        return res.status(201).send({
            user,
            token: createUserToken(user.id)
        })
    
    } catch (error) {
        return res.status(500).send({ err: "Erro ao buscar usuário" })
    }
   
})

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ err: "Dados insuficientes!" })
    }

    try {
        const user = await Users.findOne({email}).select("+password")
        if (!user) return res.status(400).send({ err: "Usuário não registrado" })

        const passOk = await bcrypt.compare(password, user.password);
        if(!passOk) {
            return res.status(401).send({err: "Falha na autenticação"})
        }
        return res.status(200).send({user, token: createUserToken(user.id)})

    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: "Erro ao buscar usuário" })
    }
   
})

module.exports = router;