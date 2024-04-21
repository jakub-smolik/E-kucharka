const express = require("express");
const router = express.Router();

const create = require("../abl/category/createAbl");
const get = require("../abl/category/getAbl");
const getAll = require("../abl/category/getAllAbl");

router.post("/create",(req, res) => {
    create(req, res);
})

router.get("/get", (req, res) => {
    get(req, res);
})

router.get("/getAll", (req, res) => {
    getAll(req,res);
})

module.exports = router;