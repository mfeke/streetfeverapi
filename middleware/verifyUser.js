const db = require("../models")
const Roles = db.role
const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
    try {


        const roles = await Roles.find({ name: { $in: JSON.parse(req.body.roles) } });
        let role = roles.map(role =>  role._id)


        
        // Check for duplicate email only
        const userByEmail = await User.findOne({ email: req.body.email, roles: role  });
        if (userByEmail) {
            return res.status(400).send({ message: "Failed! Email is already in use!" })
        }



        next();
    } catch (err) {
        return res.status(500).send({ message: err.message || err });
    }
};



const verifySignUp = {
    checkDuplicateEmail,
    
};

module.exports = verifySignUp;
