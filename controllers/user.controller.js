require("dotenv").config()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const nodemailer = require('nodemailer');
let verifyCode = Math.floor(100 + Math.random() * 9000)
const authConfig = require("../db/auth.config");
const { config } = require("dotenv");

exports.signup = async (req, res) => {
    try {
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        })

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

          // let infoData = await sndEmail(email, verifyCode)

            let token = await jwt.sign({ id: newUser.id }, authConfig.secret, {
                expiresIn: 86400

            })


            return res.status(200).json({
                message: "Account Created",
                id: newUser.id,
                accessToken: token,
                //infoData
            });

        } else {

            let oldUser = await User.findOneAndUpdate({ _id: userFound.id }, { $set: { verifyCode } })

            var token = jwt.sign({ id: oldUser.id }, authConfig.secret, {
                expiresIn: 86400

            })
        

        //let infoData =  await sndEmail(email, verifyCode)
        return res.status(200).json({
            message: "User Found ",
            accessToken: token,
            id: userFound.id,
            //infoData
        })
    }
        
    } catch (err) {
    res.status(500).send({ message: err.message });
}
}





function getOtp(otpCode) {
    const formattedCode = otpCode.toString().split('').join(' ');

    return `
          <!DOCTYPE html>
            <html>
              <head>
                  <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                          <body style="margin: 0; padding: 0; background-color: #121212; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #121212; padding: 40px 10px;">
                                    <tr>
                                            <td align="center">
                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #1a1917; border-radius: 16px; padding: 32px 24px; text-align: left;">
                                                                  <tr>
                                                                                <td>
                                                                                                <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff;">One-time code</h1>
                                                                                                                
                                                                                                                                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.5; color: #d1d1d1;">
                                                                                                                                                  Here's a one-time login code to quickly and effortlessly sign in
                                                                                                                                                                  </p>

                                                                                                                                                                                  <div style="text-align: center; margin: 32px 0; padding: 12px; font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 600; letter-spacing: 10px; color: #ffffff;">
                                                                                                                                                                                                    ${formattedCode}
                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 700; color: #ffffff;">
                                                                                                                                                                                                                                                      This code expires in 15 minutes.
                                                                                                                                                                                                                                                                      </p>

                                                                                                                                                                                                                                                                                      <p style="margin: 0; font-size: 14px; line-height: 1.4; color: #a0a0a0;">
                                                                                                                                                                                                                                                                                                        If you didn't request this email, there's nothing to worry about — you can safely ignore it.
                                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                                      </td>
                                                                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                                                                                                                                                                    </td>
                                                                                                                                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                                                                                                                                              </table>
                                                                                                                                                                                                                                                                                                                                                                                </body>
                                                                                                                                                                                                                                                                                                                                                                                  </html>
                                                                                                                                                                                                                                                                                                                                                                                    `;
}

let sndEmail = async (email, opt) => {

    try {

        // 1. Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 2. Define the email details
        const mailOptions = {
            from: '"Jump With The Boys" <no-reply@jumpwiththeboys.com>', // Sender address
            to: email,                     // List of receivers
            subject: `${opt} is your one-time code for Jump With The Boys`,
            html: getOtp(opt),
        };


        // 3. Send the email
        const info = await transporter.sendMail(mailOptions);
        //console.log("Email sent successfully!");
        // console.log("Message ID:", info.messageId);
        return info
    } catch (error) {
        console.error("Error sending email:", error);
    }
}








