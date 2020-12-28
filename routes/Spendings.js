const express = require('express');
const spenderRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Spendings = require('../models/Spendings');
//const Idee = require('../models/Idee');
const User = require('../models/User');

propSort = function(array, prop, desc) {
    array.sort(function(a, b) {
        if (a[prop] < b[prop])
            return desc ? 1 : -1;
        if (a[prop] > b[prop])
            return desc ? -1 : 1;
        return 0;
    });
}   

spenderRouter.post('/expense',passport.authenticate('jwt', {session: false}),(req,res)=>{
    const spendings = new Spendings(req.body);
    spendings.save(err=>{
        if(err)
            res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
        else{req.user.spendings.push(spendings);
            propSort(req.user.spendings, 'date', true);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
                else
                    res.status(200).json({message: {msgBody: "Success.", msgError: false}});
            })
        }
    })
})

spenderRouter.post('/delete',passport.authenticate('jwt', {session: false}), (req,res)=>{
    const {id} = req.body;
    req.user.spendings.pull(id);
    req.user.save(err=>{
        if(err)
            res.status(500).json({message: {msgBody: "An Error has occurred.", msgError: true}});
        else
            res.status(200).json({message: {msgBody: "Success.", msgError: false}});
    })
});

spenderRouter.get('/getmoneys',passport.authenticate('jwt', {session: false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('spendings').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({spendings : document.spendings, authenticated : true});
        }
    });
})


module.exports = spenderRouter;