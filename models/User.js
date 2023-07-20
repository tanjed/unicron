const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fist_name : {
        type : String,
        trim : true,
        required : true,
        max : 30,
        set : (value) => ucFirst(value)
    },    
    last_name : {
        type : String,
        trim : true,
        required : true,
        max : 30,
        set : (value) => ucFirst(value)
    },
    mobile : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true
    }
}, { 
    timestamps : true
})

const ucFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it's modified or new
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

module.exports = mongoose.model('User', userSchema)