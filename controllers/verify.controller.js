const VerifyCode = require("../models/verify.model");


exports.getVerifyByName = async (req, res) => {
    try {
        const { code } = req.params;
        const { userId} = req

        console.log(code, userId)
     const verifyCode = await VerifyCode.findOne({code, user:userId})
      if (!verifyCode) {
           return res.status(404).json({ message: "Code not found" });
      }
       res.status(200).json(verifyCode);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
