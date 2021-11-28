function init_app(express){
  function appSettings(app, package) {
    viewSetting(app) // set the view engine and the view path
    miscellaneousSettings(app, express) // miscellaneous settings
    ressourceSettings(app, express) // set the ressources the client can access
    routeSetting(app, package.routers, require('fs')) // set the app routes
    errorSetting(app) // set the error handler
    return app;
  }
  return appSettings(express(), require('./package.json'))
}

function viewSetting(app){ 
  app .set('views', __dirname+'/views').set('view engine', 'pug')
}

function miscellaneousSettings(app, express){
    app .use(require('morgan')('dev')).use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(require('cookie-parser')())
}

function ressourceSettings(app, express){
    app .use(express.static(__dirname+'/public'))
        .use('/javascripts', express.static(__dirname+'/node_modules/jquery/dist'))
}

// Ajout des routes de l'application(voir packages.json => routers)
function routeSetting(app, routers, fs){
  const functions = require("./routes/functions");
  for(routerKey in routers) {
    const dir = routers[routerKey].folder && __dirname+routers[routerKey].folder
    dir && !fs.existsSync(dir) && fs.mkdirSync(dir);
    app.use(
      routers[routerKey].alias || "/"+routerKey,
      require('./routes/'+routerKey)(routers[routerKey].routes, functions)
    );
  }
}

function errorSetting(app){
  // catch 404 and forward to error handler
  app.use(function(req, res, next) { next(require('http-errors')(404)); })
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  })
}
module.exports = init_app(require('express'));