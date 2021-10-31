var express = require('express');
var router = express.Router();

const getUrl = (req) => req.protocol + '://' + req.get('host') + '/api'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    title : 'API - Challenge JS Alkemy',
    status : 200,
    data : {
      getAll : {
        method : 'GET',
        endpoint : getUrl(req)
      },
      getOne : {
        method : 'GET',
        endpoint : getUrl(req) + '/{id}'
      },
      create : {
        method : 'POST',
        endpoint : getUrl(req) + '/create',
        dataRequired : {
          concept : 'STRING(45)',
          amount : 'INTEGER',
          date : 'DATEONLY yyyy/mm/dd',
          valueid : 'INTEGER'
        }
      },
      edit : {
        method : 'PUT',
        endpoint : getUrl(req) + '/edit/{id}'
      },
      remove : {
        method : 'DELETE',
        endpoint : getUrl(req) + '/remove/{id}'
      }
    }
  })
});

module.exports = router;
