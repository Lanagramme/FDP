const
  express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  fs = require('fs'),
  uuid = require('uuid').v1

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({this_is: 'a TRAP'});
});

router.post('/login', function (req, res) {
  console.log(req.body)
  // TODO: validate the actual user user
  const profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // we are sending the profile in the token
  const token = jwt.sign(profile, 'test123', { expiresIn: 60*5 });

  res.json({token: token});

});

module.exports = router;
