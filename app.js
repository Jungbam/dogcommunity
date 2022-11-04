const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // HTTP 요청 로그에 대한 패키지
const logger = require('./config/winston');

const indexRouter = require('./routes/index');

const app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 로거 예제
// 위에서부터 높은 레벨

logger.error('에러');
logger.warn('주의');
logger.info('정보');
logger.http('HTTP');
logger.debug('디버그');

// const logger = require('./config/winston'); 하신 뒤에
// console.log/console.error 대용으로 logger.info/logger.error 사용하면 됩니다.

app.use(
  morgan(
    // 개발 환경과 배포 환경의 출력 내용 차별화
    process.env.NODE_ENV === 'development'
      ? 'dev'
      : ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: logger.stream },
  ),
);
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
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  logger.info(`포트 ${app.get('port')}에서 대기 중입니다.`);
});
