const User = require("../models/User")

exports.login = (req, res) => {
    res.json({
        message : 'Hello'
    })
}


exports.registration = (req, res) => {
    const {fist_name, last_name, mobile, password, email} = req.body
    
    User.findOne({
        $or : [{mobile}, {email}] 
    }).then((existingUser) => {
        if (existingUser) {
            return res.status(400).json({
                success : false,
                message : 'User already exists' 
            })
        }

        (new User({fist_name, last_name, mobile, password, email}))
        .save()
        .then((user) => {
            return res.status(400).json({
                success : true,
                message : 'User created' 
            })
        })
    })
}