var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var usersRouter = require('./router/users');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(session({
  secret: 'SOME_SECRET_KEY',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.get('/', function(req, res){
  let session = req.session;
  if (session) {
    res.send('No session!');
  } else {
    res.send('Root');
  }
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});