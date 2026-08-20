const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const authConfig = require("../db/auth.config")

exports.signup = (req, res) => {

    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    const { email } = req.body

    if (!email ) {
        return res.send(400).json({ message: "Missing values" })
    }

    User.findOne({ email }).then((userFound) => {
        if (!userFound) {
            const user = new User({
                email, 
            });

            user.save().then(message => {
                return res.status(200).json({ message: "Account Created"  });

            }).catch(err => {
                return res.status(300).json(err);
            })

        }
        else {
            return res.status(409).json({ message: "Email address already in use" })
        }
    })

};


