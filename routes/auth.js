const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.get('/', (req, res) => {
    res.send("Hello")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    // res.json({ message: "Scuessfully posted" })
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User email already exsist" })
            }
            const user = new User({
                email,
                password,
                name
            })
            user.save()
                .then(user => {
                    res.json({ message: "Saved Scuessfully" })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router