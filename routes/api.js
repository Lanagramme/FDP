const express = require('express');
const router = express.Router();
const api = require('../tools/json_api/main')

router.post('/', function(req, res, next) {
  res.send(
    (api({data: req.body, action: 'read'})._id).toString()
  )
});

router.get('/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.query, 'read')
  )
});
router.post('/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'create')
  )
});
router.patch('/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'update')
  )
});
router.delete('/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'delete')
  )
});

  module.exports = router;