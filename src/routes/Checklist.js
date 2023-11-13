const express = require("express");

const router = express.Router();
const Checklist = require("../models/Checklist");

router.get("/", async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).send(checklists);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/", async (req, res) => {
    let {name} = req.body;

    try {
         let checklists = await Checklist.create({name});
         res.status(200).send(checklists);
    } catch (error) {
        res.status(422).json(error);
    }
   
    
})

router.get("/:id", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;