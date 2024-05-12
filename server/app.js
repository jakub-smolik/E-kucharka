const express = require("express");
const categoryController = require("./controller/categoryController");
const recipieController = require("./controller/recipieController");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded( {extended:true}));

app.use("/category", categoryController);
app.use("/recipie", recipieController);

app.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    res.send("<p>Backend of <strong>E-kuchařka</strong> application</p>");
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});