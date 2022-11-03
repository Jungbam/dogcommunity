const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// log : 로그에 대한 라이브러리
const logger = require('morgan');
const dotenv = require('dotenv');
const consolidate = require('consolidate');

const indexRouter = require('./routes/index');

// 환경변수를 불러오기 위해 사용
dotenv.config();
const app = express();

app.set('port', process.env.PORT || 5000);
// 템플릿 엔진을 html로 설정
app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '포트에서 대기 중');
});
