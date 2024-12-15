//in the development phase they are used.
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()   
}
const express = require("express");
const port = 3000;
const app = express();

const SignUpRoutes = require("./Route/SignUp.js");
const LoginRoutes = require("./Route/Login.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");



app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, (req, res) => {
    console.log("Server is ready!");
});

// Connection to MongoDB
const AtlasDb_url = process.env.ATLASDB_URL;
console.log(AtlasDb_url); 

async function main() {
    try {
        await mongoose.connect(AtlasDb_url);
        console.log("MongoDB connection successful!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

main();

//Routes (SignUp and Login Routes).
app.use("/SignUp", SignUpRoutes);
app.use("/login", LoginRoutes);

//Root route
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// if not met then it will send the error.
app.all("*", (req, res, next) => {
    res.status(500).send("Page Not Found!");
});