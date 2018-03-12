const http = require('http');
const app = require('./app');
const moment = require('moment');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  var date = Date.now()
  console.log( `[${moment(date).format("YYYY-MM-DD HH:MM:SS")}]--> start up post ${process.env.PORT}` );
});
