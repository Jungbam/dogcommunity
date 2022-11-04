const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    // 날짜 형식
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
  ),
});

// 개발 환경일 경우 콘솔로 출력하기 위한 조건문
if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      format: format.combine(
        // 색 입히기
        format.colorize(),
        // 출력 형식
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}] ${
              // 객체일 경우 내용 출력
              message instanceof Object ? JSON.stringify(message) : message
            }`,
        ),
      ),
      level: 'silly',
    }),
  );
}
// morgan도 winston을 통해 출력하기 위한 stream 메서드 추가
logger.stream = { write: (message) => logger.http(message) };

module.exports = logger;
