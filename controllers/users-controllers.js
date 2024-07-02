const {userLoginModel} = require("../models/users-models")



exports.userLoginController = (req,res) => {
    const {username,password} = req.body
    userLoginModel(username,password).then((token) => {
        res.status(200).send({token : token, text : "User Login Successful"})
    })
    
}