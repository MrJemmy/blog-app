const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require("../models/user")
const { addRevokedToken } = require('../middleware/tokenBlacklist');

const salt = bcrypt.genSaltSync(10)
const secret = process.env.SECRET

const userRegister = async(req, res) => {
    const {username, password, password2} = req.body;
    try {
        if(password === password2){
            const iPassword = bcrypt.hashSync(password, salt)
            const userDoc = await User.create({username:username, password:iPassword})
            res.status(200).json({
                registerdUser: userDoc,
                msg: "success"
            })
        }else{
            res.status(400).json({
                msg: "password are not maching"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400 ).json({
                msg: error
            })
    }
}

const userLogin = async(req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username})
    if(!userDoc){
        res.status(400).json({
            result: false,
            msg: "user not found"
        })
    }
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        const token = jwt.sign({ username, id: userDoc._id}, secret, {expiresIn: '1h'});
        res.status(200).cookie('token', token).json({
            token: token,
            result: true,
            msg: "success"
        })
    }else{
        res.status(400).json({
            result: false,
            msg: "password is not correct"
        })
    }
}

const userLogout = async(req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    addRevokedToken(token)
    res.cookie('token', '').json({
        msg: "logged out"
    })
}

module.exports = {userRegister, userLogin, userLogout}