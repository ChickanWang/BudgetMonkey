const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SpendingSchema = require('./Spendings').schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 30
    },
    username: {
        type: String,
        required: true,
        min: 4,
        max: 15,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    spendings: [SpendingSchema]
});

// UserSchema.pre('save', function(next){
//     if(!this.isModified('password'))
//         return next();
//     bcrypt.hash(this.password,10,(err,passwordHash)=>{
//         if(err)
//             return next(err);
//         this.password = passwordHash;
//         next();
//     });
// });




// UserSchema.methods.comparePassword = function(password,cb){
//     bcrypt.compare(password, this.password,(err,isMatch)=>{
//         if(err)
//             return cb(err);
//         else{
//             if(!isMatch)
//                 return cb(null,isMatch);
//         return cb(null, this);
//         }
//     });
// }

module.exports = mongoose.model('User',UserSchema);