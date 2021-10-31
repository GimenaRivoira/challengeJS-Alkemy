var express = require('express');
var router = express.Router();

const { processLogin, processRegister, getAllUsers } = require('../API/userController')

router.get('/', getAllUsers);
router.post('/login', processLogin);
router.post('/register', processRegister)

module.exports = router;
