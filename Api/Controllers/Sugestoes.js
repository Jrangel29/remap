const express = require("express");
const { create, getAll } = require("../Models/Sugestoes");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
    const sugestoes = await getAll();

    res.status(200);
    res.json(sugestoes);
    res.end();
    })
    .post(checkJwt, async (req, res) => {

    const sugestao = await create(req.body);
    
    res.json(sugestao);
    res.status(201);
    res.end();

    });

module.exports = router;