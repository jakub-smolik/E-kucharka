const express = require("express");
const router = express.Router();

const create = require("../abl/recipie/createAbl");
const get = require("../abl/recipie/getAbl");
const getAll = require("../abl/recipie/getAllAbl");
const update = require("../abl/recipie/updateAbl");
const remove = require("../abl/recipie/removeAbl");
const getTip = require("../abl/recipie/getTipAbl");

router.post("/create",(req, res) => {
    create(req, res);
})

router.get("/get", (req, res) => {
    get(req, res);
})

router.get("/getAll", (req, res) => {
    getAll(req,res);
})

router.post("/update", (req, res) => {
    update(req, res);
})

router.post("/remove", (req, res) => {
    remove(req, res);
})

router.get("/getTip", (req, res) => {
    getTip(req, res);
})

module.exports = router;