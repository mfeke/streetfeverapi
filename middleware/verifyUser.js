const db = require("../models")
const Roles = db.role
const User = db.user;
const Merchant = db.merchant
const checkDuplicateEmail = async (req, res, next) => {
    try {

        const { email, mobileNumber } = req.body

        if (!req.body.roles){

            // Check for duplicate email only
            const userByEmail = await User.findOne({ email });
            if (userByEmail) {
                return res.status(400).send({ message: "Failed! Email is already in use!" })
            }

            if (req.body.mobileNumber) {
                const userByMobile = await User.findOne({ mobileNumber: JSON.parse(mobileNumber) })
                if (userByMobile) {
                    return res.status(400).send({ message: "Failed! Mobile number is already in use!" })
                }
            }

            
        }

        if (req.body.roles)  {
            // Check for duplicate email only
            const userByEmail = await Merchant.findOne({ email });
            if (userByEmail) {
                return res.status(400).send({ message: "Failed! Email is already in use!" })
            }

            if (req.body.mobileNumber) {
                const userByMobile = await Merchant.findOne({ mobileNumber: JSON.parse(mobileNumber) })
                if (userByMobile) {
                    return res.status(400).send({ message: "Failed! Mobile number is already in use!" })
                }
            }

        }

        //next();
    } catch (err) {
        return res.status(500).send({ message: err.message || err });
    }
};



const verifySignUp = {
    checkDuplicateEmail,

};

module.exports = verifySignUp;
