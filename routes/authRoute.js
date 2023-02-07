const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const User = require('../models/User');

router.get("/admin", authController, async (req, res) => {
    //console.log(req.userVerified) //resultado: { id: '63dc08ee5bff0beff3009a8f', admin: true, iat: 1675365579 }
    if(req.userVerified.admin){
        const data = await User.find();
        return res.status(200).json({ data, message: "This data can only be seen by a logged user.", status: 200 })
    }else{
        return res.status(401).json({ message: 'Access Denied. Insufficient Privileges.', status: 401 })
    }
});

router.get("/common", authController, async (req, res) => {
    const data = await User.findById(req.userVerified.id);
    return res.status(200).json({ data, message: "This data can only be seen by a logged user.", status: 200 })
});

router.get("/free", (req, res) => {
    return res.status(200).json({ data: 'Free data', message: "This data can be seen by anyone.", status: 200 })
});

module.exports = router;