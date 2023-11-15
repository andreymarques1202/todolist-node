const express = require("express");

const router = express.Router();
const Checklist = require("../models/Checklist");

router.get("/", async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render("checklists/Index", {checklists: checklists});
    } catch (error) {
        res.status(200).render("pages/Error", {error: "Erro ao exibir as Listas"});
    }
})

router.get("/new", async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render("checklists/New", {checklist: checklist});
    } catch (error) {
        res.status(500).render("pages/Error", {error: "Erro ao carregar o fomulario"})
    }
})

router.get("/:id/edit", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/Edit", {checklist: checklist})
    } catch (error) {
        res.status(500).render("pages/Error", {error: "Erro ao carregar o fomulario de edição"})
    }
})

router.post("/", async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = new Checklist({name});

    try {
         await checklist.save();
         res.redirect("/checklists");
    } catch (error) {
        res.status(422).render("checklists/New", {checklists: {...checklist, error}});
    }
   
    
})

router.get("/:id", async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/Show", {checklist: checklist});
    } catch (error) {
        res.status(500).render("pages/Error", {error: "Erro ao exibir as Listas de tarefas"});
    }
})

router.put("/:id", async (req, res) => {
    let {name} = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id)
    try {
        await checklist.update({name}, {new: true});
        res.redirect("/checklists");
    } catch (error) {
        let errors = error.errors;
        res.status(422).render("checklists/Edit", {checklist: {...checklist, errors}});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;