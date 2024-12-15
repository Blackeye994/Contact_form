const express = require("express");
const routes = express.Router();
const swal = require("sweetalert2");
let User = require("../model/users.js");
const mongoose = require("mongoose");

// Get request of the Sign Up
routes.get("/", (req, res) => {
    res.render("Authenication/signUp.ejs");
})

//Post Request of the Sign Up
routes.post("/", async (req, res) => {
    console.log("request received", req.body);
    let { FirstName, LastName, emails, password } = req.body;
    let username = FirstName + " " + LastName;
    console.log(username);
    // Manual validation
    if (!username || !emails || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Additional validation (e.g., email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emails)) {
        return res.status(400).json({ message: "Invalid email format." });
    }
    const user = new User({
        username : username,
        emails: emails,
        password: password
    });

    try {
        console.log(user);
        console.log(User);
        await user.save();
        // res.status(200).redirect("/SignUp.ejs", {sweetAlert});
        res.status(200).json({ message: "User  successfully registered!" });
       
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "The email is already in use. Please use a different email" });
    }

    console.log(username, emails, password);
});

module.exports = routes;