const express = require("express");
const { create, getAll } = require("../Models/Edificios");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
    const edificios = await getAll();

    res.status(200);
    res.json(edificios);
    res.end();
    })
    .post(checkJwt, async (req, res) => {

    const edificio = await create(req.body);
    
    res.json(edificio);
    res.status(201);
    res.end();

    });

module.exports = router;