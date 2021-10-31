var express = require('express');
var router = express.Router();

const {getValues } = require('../API/apiController')


router.get('/', getValues);

module.exports = router;
