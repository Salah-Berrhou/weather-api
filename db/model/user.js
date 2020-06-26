const mongoose = require('mongoose'),
    validator = require("validator"),
    bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(value){
                if(!validator.isEmail(value)){
                    throw new Error("Enter a valid email")
                }
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [7, "Password is too short"]
    },
})

userSchema.pre("save", async function(next) {
    const user = this
    if(user.isModified('password')){
        const hashed = await bcrypt.hash(user.password, 8)
        user.password = hashed
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User