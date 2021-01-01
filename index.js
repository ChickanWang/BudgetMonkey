const express = require('express');
const app = express();
const router = require('express').Router();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passport')(passport)

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(session({secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {secure: false, 
             httpOnly: false, 
             maxAge: 1000 * 60 * 60 * 24 * 7}}));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose');
})

const userRouter = require('./routes/User');
const spenderRouter = require('./routes/Spendings');
const statsRouter = require('./routes/Stats');

app.use('/user',userRouter);
app.use('/expenses', spenderRouter);
app.use('/stats', statsRouter);

app.listen(port, ()=>{
    console.log("Server Started.");
})

if (process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
}

//module.exports = router;