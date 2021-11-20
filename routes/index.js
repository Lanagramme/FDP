function newIndexRoute(acc, item) { 
  acc[item.method](item.path, (req, res, next)=>{
    res.render('index', { title: item.name, params: { get: req.query, post: req.body }, ... (item.data||{}) });
  })
  return acc
}

module.exports = require('../package.json').routes.index.reduce( newIndexRoute, require('express').Router() );