require("dotenv").config()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Merchant = require("../models/merchant.model");


const Role = require("../models/roles.model")


const nodemailer = require('nodemailer');
let verifyCode = Math.floor(1000 + Math.random() * 9000);

const authConfig = require("../db/auth.config");


exports.signup = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password } = req.body;


        if (!fullName || !mobileNumber || !password || !email) {
            return res.status(400).json({
                error: 'All fields fullName mobile number email password are required and cannot be empty'
            });
        }


        const hashedPassword = await bcrypt.hash(password, 8);

        const merchant = new Merchant({
            fullName,
            email,
            mobileNumber: Number(mobileNumber),
            password: hashedPassword
        });


        const defaultRole = await Role.findOne({ name: "merchant" });


        if (defaultRole) {
            merchant.roles = [defaultRole._id];
        }


        merchant.save()

        let token = jwt.sign({ id: merchant.id }, authConfig.secret, {
            expiresIn: 86400

        })

        return res.status(200).send({
            accessToken: token,
            message: "Merchant was registered successfully!"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message || err });
    }
};


exports.signin = async (req, res) => {
    try {
        let { email, password } = req.body
        let merchant = await Merchant.findOne({ email })
        if (!merchant) {
            return res.status(404).send({ message: "We couldn't find an account matching that email" })

        }

        let passwordlsVaild = bcrypt.compareSync(
            password,
            merchant.password
        )

        // res.status(200).json(passwordlsVaild)
        if (!passwordlsVaild) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }




        let token = jwt.sign({ id: merchant.id }, authConfig.secret, {
            expiresIn: 86400

        })
        res.status(200).send({
            id: merchant._id,
            fullName: merchant.fullName,
            email: merchant.email,
            roles: merchant.roles,
            accessToken: token

        })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message });
    }


}

exports.updateProfile = async (req, res) => {

    try {

        const { userId } = req

        console.log(req.body)
        
        let merchant = await Merchant.findOneAndUpdate({ _id: userId }, req.body, { useFindAndModify: false })

        if (!merchant) {
            res.status(400).send({ message: `Cannot update Merchant with id=${userId}. Maybe Merchant was not created!` })
        }
        res.send({ message: "Merchant was updated successfully." })
        //  res.status(200).json(user)

    } catch (err) {
        res.status(500).json({ message: err.message })

    }

}


