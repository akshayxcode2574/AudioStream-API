const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req,res){
    const {userName,email,password,role} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or : [
            {userName},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({message: "User is Already Exists"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        userName,email,password: hash,role
    }) 

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET) 

    res.cookie("token",token)

    res.status(201).json({
        message : "User Register Successfully",
        user: {
            userName: user.userName,
            email: user.email,
            role: user.role,
            password: user.password
}

    })
}

async function loginUser(req,res){
    const {userName,email,password,role} = req.body;

    const user = await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })
    if(!user){
        return res.status(409).json({
            message : "Invalid Credentials"
        })
    }

    isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(409).json({
            message : "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message : "User Logged Successfully",
        user: {
            userName: user.userName,
            email: user.email,
            role: user.role,
            password: user.password
}

    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message : "User logged out successfully"
    })
    
}

module.exports = {registerUser,loginUser,logoutUser}