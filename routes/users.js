function newUsersRoute(acc, item) {

  acc.post(item.path, (req, res, next)=>{
    res.json(
      (Array.isArray(item.methods) && item.methods || []).reduce(
        (res, method) => Object.assign(res, this[method]( ...this.getParams(req.body,item.data) )),
        {}
      )
    );

  })

  return acc
}

module.exports = (routes, methods) => routes.reduce( newUsersRoute.bind(methods), require('express').Router() );
