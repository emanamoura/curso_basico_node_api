const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
router.get("/", auth ,(req, res) => {
    console.log(res.locals.auth_data)
    return res.send({message: "IMPORTANTEEEEEEEEEEEEEE"})
})

router.post("/", (req, res) => {
    return res.send({message: "Tudo okay com post na raiz"})
})

module.exports = router;