const express = require("express");

const router = express.Router();
const Checklist = require("../models/Checklist");

router.get("/", async (req, res) => {
    try {
        let checklist = await Checklist.find({});
        res.status(200).send(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.post("/", async (req, res) => {
    let {name} = req.body;

    try {
         let checklist = await Checklist.create({name});
         res.status(200).send(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
   
    
})

router.get("/:id", (req, res) => {
    console.log(req.body["name"]);
    res.send(`ID: ${req.params.id}`);
})

module.exports = router;