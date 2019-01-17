var express = require('express');
var session = require('express-session');
//var helmet = require('helmet');
var bodyParser = require('body-parser');
var usersRouter = require('./router/users');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(session({
  // store : 영속 관리를 위해 redis 등으로 설정해줘야함 (디폴트로 서버 앱 인메모리에 저장)
  secret: 'SOME_SECRET_KEY',
  name: "sessionId",    // 디폴트는 "sid", 디폴트 그대로 사용하면 공격에 노출될 수 있음
  resave: false,
  saveUninitialized: true,
  cookie: { path: '/', maxAge: 60 * 60 * 1000 },
}));

//app.use(helmet()); // TODO : 보안 http://expressjs.com/ko/advanced/best-practice-security.html
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.get('/', function(req, res){
  console.log(req.session.counter);
  let session = req.session;
  if (session && session.counter >= 0) {
    session.counter++;
    res.send(`Counter : ${session.counter}`);
  } else {
    // session 데이터 발급
    req.session.counter = 0;
    res.send('No session!!');
  }
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});