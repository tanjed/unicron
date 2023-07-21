const Business = require("../models/Business")
const User = require("../models/User")

exports.login = (req, res) => {
    res.json({
        message : 'Hello'
    })
}


exports.registration = async (req, res) => {
    try {
        const {fist_name, last_name, mobile, password, email} = req.body

        //Check if user already exists or not
        const user = await User.findOne({$or : [{mobile}, {email}]})
        if (user) {
            return res.status(400).json({
                success : false,
                message : 'User already exists'
            })
        }

        //Registering business and users
        (new User({fist_name, last_name, mobile, password, email}))
        .save()
        .then((user) => {
            return res.status(200).json({
                success : true,
                message : 'User created' 
            })
        })
        .catch((err) => {
            return res.status(err.status || 500).json({
                success : false,
                message : err.message
            })
        })
    }
    catch(err){
        return res.status(err.status || 500).json({
            success : false,
            message : err.message
        })
    }
}