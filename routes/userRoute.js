const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { login, register } = require('../controllers/userController')
const methodOverride = require("method-override")

router.use(methodOverride('_method'));

// router.post('/login', bodyParser.urlencoded({ extended: true }), login);

router.post('/login', bodyParser.json(), login)

router.post('/register', bodyParser.json(), register);

module.exports = router;