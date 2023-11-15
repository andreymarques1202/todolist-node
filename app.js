const express = require("express");
const path = require("path")
const checklistsRouter = require("./src/routes/Checklist")
const tasksRouter = require("./src/routes/Task")
const rootRouter = require("./src/routes/Index");
const methodOverride = require("method-override");

require("./config/Database");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extend: true}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs")

app.use("/", rootRouter)
app.use("/checklists", checklistsRouter);
app.use("/checklists", tasksRouter.checklistDependent);


app.listen(3000, () => {
    console.log("Servidor iniciado");
})