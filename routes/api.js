function newApiRoute(acc, item) {
  acc[item.method](item.path, (req, res, next)=>{
    res.send(
      require('../tools/json_api/main')(req.params[0].split('/'), req[item.method === "get" ? 'query': 'body'], item.action)
    )
  })
  return acc
}

module.exports = require('../package.json').routes.api.reduce( newApiRoute, require('express').Router() );