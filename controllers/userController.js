const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {

    login: async function (req, res) {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const doc = await User.findOne({ email })
                if (doc) {
                    let encryptedPassword = doc.password;
                    if (bcrypt.compareSync(password, encryptedPassword)) {
                        const token = jwt.sign({id: doc.id, admin: doc.admin}, process.env.TOKEN_SECRET, {expiresIn: 20});
                        res.header("authorization-token", token)
                        return res.status(200).json({ message: 'User logged.', status: 200, token })
                    } else {
                        return res.status(401).json({ message: 'Email or password incorrect.', status: 401 })
                    }
                } else if (!doc) {
                    return res.status(401).json({ message: 'Email or password incorrect.', status: 401 })
                }
            } else if (!email || !password) {
                return res.status(400).json({ message: "Fill in all the fields.", status: 400 })
            } else {
                return res.status(400).json({ message: "Something go wrong.", status: 400 })
            }
        } catch (error) {
            res.status(400).send("Error: " + error.message)
        }
    },

    register: async function (req, res) {
        const { name, email, password } = req.body;
        const newDoc = new User(req.body);
        newDoc.password = bcrypt.hashSync(password);
        try {
            if (name && email && password) {
                const compareEmail = await User.findOne({ email })
                if (compareEmail) return res.status(400).json({ message: "Email already registered.", status: 400 });
                else if (password.length < 6) return res.status(400).json({ message: "Password too short. Must have at least 6 characters.", status: 400 })
                else if (password.length > 20) return res.status(400).json({ message: "Password too long. Must have a maximum of 20 characters.", status: 400 })
                else if (password.match(/[a-z]/gi) == null) return res.status(400).json({ message: "Password must have at least one alphabetic character.", status: 400 })
                else if (password.match(/[0-9]/gi) == null) return res.status(400).json({ message: "Password must have at least one numeric character.", status: 400 })
                else {
                    await newDoc.save();
                    console.log("-Document added to database.")
                    res.status(200).json({message: "User registered successfully.", status: 200});
                }
            } else if (name || !email || !password) {
                return res.status(400).json({ message: "Fill in all the fields.", status: 400 })
            } else {
                return res.status(400).json({ message: "Something go wrong.", status: 400 })
            }
        } catch (error) {
            res.status(400).send("Error: " + error.message)
        }
    }

}

module.exports = userController;