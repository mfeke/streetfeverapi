const jwt = require("jsonwebtoken");
const config = require("../db/auth.config");
const db = require("../models");

const User = db.user
const Role = db.role

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    })

}

const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const role = await Role.find({ name: { $in: JSON.parse(req.body.roles) } });

    let user = await User.findOne({
        email: req.body.email,
    })

    
    if (user) {
        res.status(400).send({ message: "Failed Email is already in use!" })
        return
    }

    //next()
}
const authJwt = {
    verifyToken,
    checkDuplicateUsernameOrEmail

}

module.exports = authJwt