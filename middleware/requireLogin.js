const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const JWT_SECRET = process.env.JWT_SECRET
module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorization === Bearer ewefwegwrherhe  - this is ur token
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }

    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }

        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })


    })
}