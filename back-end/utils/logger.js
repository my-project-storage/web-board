const winston = require('winston');
const process = require('process');
const appRoot = require('app-root-path');

// ? winston format 구조분해 할당
const { combine, timestamp, label, printf } = winston.format;

// ? 나만의 format 정하기
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// ? 옵션 설정
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/winston-test.log`, // 로그파일을 남길 경로
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: 'winston-test' }),
            timestamp(),
            myFormat // log 출력 포맷
        ),
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false, // 로그형태를 json으로도 뽑을 수 있다.
        colorize: true,
        format: combine(label({ label: 'nba_express' }), timestamp(), myFormat),
    },
};

let logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file), // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
    ],
    exitOnError: false,
});

// ? 개발 시 콘솔 출력
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console)); // 개발 시 console로도 출력
}

module.exports = logger;
