const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const nodemailer = require('nodemailer');

const authConfig = require("../db/auth.config");
const { config } = require("dotenv");

exports.signup = async (req, res) => {
    try {
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        })
        let verifyCode = Math.floor(100 + Math.random() * 9000);

        const { email } = req.body;
        if (!email) {
            return res.send(400).json({ message: "Missing values" })
        }

        let userFound = await User.findOne({ email })
        if (!userFound) {

            const user = new User({
                email,
                verifyCode
            });

            let newUser = await user.save()

            
            return res.status(200).json({ message: "Account Created", id:newUser.id});

        } else {

            return res.status(200).json({ message: "User Found ", id:userFound.id })
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}






