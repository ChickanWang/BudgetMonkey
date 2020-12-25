const express = require('express');
const app = express();
const router = require('express').Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const session = require('express-session');
var passport = require('passport');
require('dotenv').config();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(session({
    //secret: process.env.SECRET,
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 30
    }
}));

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
app.use('/user', spenderRouter);
app.use('/user', statsRouter);

app.listen(port, ()=>{
    console.log("Server Started.");
})

module.exports = router;

/*app.get('/', (req, res, next) => {
    res.send('monkey')
})*/

/*const userInput = {
    name: "Stephen Wang",
    username: "ChickenWang",
    password: "1111111"
}
const user = new User(userInput);
user.save((err,document)=>{
    if(err)
        console.log(err)
    console.log(document);
})*/