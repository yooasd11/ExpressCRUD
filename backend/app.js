var express = require('express');
var session = require('express-session');
var cors = require('cors'); // CORS proxy
var helmet = require('helmet');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var error = require('./middleware/error');
var v1Routes = require('./router/v1/index');
var { port, env, logs } = require('./config/vars');
var app = express();

app.use(morgan(logs));   // logger
app.use(cors({
  origin: "http://localhost:8000",
  credentials: true,
}));
app.use(session({
  // TODO : store - 영속 관리를 위해 redis 등으로 설정해줘야함 (디폴트로 서버 앱 인메모리에 저장)
  secret: 'SOME_SECRET_KEY',
  name: "CASID",    // 디폴트는 "sid", 디폴트 그대로 사용하면 공격에 노출될 수 있음
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
}));
app.use(helmet()); // 보안 http://expressjs.com/ko/advanced/best-practice-security.html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', v1Routes);

app.use(error.handler);
app.use(error.notFound);

app.listen(port, function () {
  console.log(`Server running on port ${port} (${env})`);
});