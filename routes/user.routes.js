const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/UserModel.js")

userRouter.get("/", (req, res) => {
    res.send("all the users")
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    let option ={
        expiresIn:"10m"
    }
    try {
        let data = await UserModel.find({ email })
        if (data.length > 0) {
            let token=jwt.sign({userId: data[0]._id },"revanth",option);
           // console.log(token);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) return res.send({ message: "something went wrong" + err, status: 0 })
                if (result) {
                    res.send({
                        message: "user loged in successfully",
                        token: token,
                        status: 1
                    })
                }
                else {
                    res.send({
                        message: "Incorrect password",
                        status: 0
                    })
                }
            });
        } else {
            res.send({
                message: "user does not exit ...",
                status: 0
            })
        }
    }
    catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }


});


userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) return res.send({ message: "something went wrong here .", status: 0 })
        try {
            let user = new UserModel({ name, email, password: hash })
            await user.save()
            res.send({
                message: "user created here",
                status: 1
            })
        }
        catch (err) {
            res.send({
                message: err.message,
                status: 0
            })
        }
    })
})
module.exports = {
    userRouter,
};