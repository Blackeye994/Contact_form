const express = require("express");
const routes = express.Router();
const swal = require("sweetalert2");
const User = require("../model/users.js");
const bcrypt = require("bcryptjs");

//Login Page
routes.get("/", (req, res) => {
    res.render("Authenication/login.ejs");
});

//Post Request login page
routes.post("/", async (req, res) => {
    const { emails, password } = req.body;
    // Manual validation
    if (!emails || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emails)) {
        return res.status(400).json({ message: "Invalid email format." });
    }
    let loginUser = await User.findOne({ emails: emails });
    console.log(loginUser);

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
        return res.status(400).json({message: "Invalid Password"});
    }

    res.status(200).json({message: "Login successful! Welcome back!"} );
});

module.exports = routes;