const express = require("express");
const checklistDependentRoute = express.Router();
const Checklist = require("../models/Checklist");
const Task = require("../models/Task");

checklistDependentRoute.get("/:id/tasks/new", async (req, res) => {
    try {
        let task = Task();
        res.status(200).render("tasks/New", {checklistId: req.params.id, task: task})
    } catch (error) {
        res.status(422).render("pages/Error", {error: "Erro ao carregar o formulario"})
    }
})

checklistDependentRoute.post("/:id/tasks", async (req, res) => {
    let {name} = req.body.task;
    let task = new Task({name, checklist: req.params.id})
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`)
    } catch (error) {
        let errors = error.errors
        res.status(422).render("tasks/New", { task: {...task, errors}, checklistId: req.params.id})
    }
})

module.exports = {checklistDependent: checklistDependentRoute}