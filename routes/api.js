var express = require('express');
var router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const {create, getAll, edit, getOne, remove } = require('../API/apiController')

/* GET home page. */
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/create' ,create);
router.put('/edit/:id', edit);
router.delete('/remove/:id', remove)

module.exports = router;
