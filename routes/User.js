const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Spendings = require('../models/Spendings');

userRouter.post('/signup',(req,res)=>{
    const {name, username, password} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
        if(user)
            res.status(400).json({message: {msgBody: "Username already taken.", msgError: true}});
        else{
            const newUser = new User({name, username, password});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
                else
                    res.status(201).json({message: {msgBody: "Account Created Sucessfully.", msgError: false}});
            });
        }
    });
});

const signToken = userID =>{
    return JWT.sign({
        iss: "jVvEiDLsbEN3oX0zghFCq7Ziqr4m9Zqh",
        sub: userID
    }, "jVvEiDLsbEN3oX0zghFCq7Ziqr4m9Zqh", {expiresIn : "1h"});
}

userRouter.post('/login',passport.authenticate('local', {session: false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,name,username} = req.user;
        const token = signToken(_id);
        res.cookie('jVvEiDLsbEN3oX0zghFCq7Ziqr4m9Zqh',token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {name, username}});
    }
})

userRouter.get('/logout',passport.authenticate('jwt', {session: false}),(req,res)=>{
    res.clearCookie('jVvEiDLsbEN3oX0zghFCq7Ziqr4m9Zqh');
    res.json({user:{username:'', name: ''}, success: true});
})

module.exports = userRouter;