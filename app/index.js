const restify = require('restify');
const cluster = require('cluster');

const Database = require('../database')
const Routes = require('../routes');

var server = restify.createServer({
  name: 'localhost',
  ignoreTrailingSlash: true,
});

async function createServer() {
  await Database.connect()
  
  server.use(restify.plugins.jsonp())
  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.queryParser())

  Routes(server)

  server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  })
}

module.exports = {
  createServer,
}