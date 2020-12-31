const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const User = require('../models/User');
const Spendings = require('../models/Spendings');
const bcrypt = require('bcryptjs')
const { forwardAuthenticated, ensureAuthenticated } = require('../auth')

userRouter.post('/signup',(req,res)=>{
    const {name, username, password} = req.body;

    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
        if(user)
            res.status(400).json({message: {msgBody: "Username already taken.", msgError: true}});
        else{
            const newUser = new User({
                name,
                username,
                password
              });

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                        res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}})
                    })
                    .catch(err => console.log(err));
                });
              });
            }
    });
});

userRouter.post('/login', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
        return res.status(401).json(err)
    }
    if (!user) {
        return res.status(401).json(info);
    }
    req.login(user, err =>{
        if (err)
        {
            return next(err)
        }
        var userInfo ={
            isAuthenticated : true,
            name: req.user.name,
            username : req.user.username
        } 
        res.send(userInfo);
        // res.status(201).json({isAuthenticated: true, username: req.username, message : {msgBody : "Logged in", msgError: false}});
    })
  })(req, res, next);
});

userRouter.get('/logout', function(req, res){
    req.logout();
    res.status(201).json({message : {msgBody : "Logged out!", msgError: false}})
});

userRouter.get('/authenticated', ensureAuthenticated,(req,res)=>{
    const {name, username} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, name}});
});

userRouter.get('/', ensureAuthenticated,(req,res,next) =>{
    if(req.user)
    {
        res.send(req.user)
    }
    else
    res.send({})
})


module.exports = userRouter;