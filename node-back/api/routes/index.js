const authRouter = require('./auth');
const logger = require('../../utils/logger');
module.exports = function expressRouter(app) {
    app.use('/auth', authRouter);
    app.get('/', (req, res) => {
        res.send(`
            <h1>태호 홈페이지</h1>
            <a href="https://blog.naver.com/lth9036">내 블로그로 가기</a>
            `);
    });
    logger.info('Complete Routes');
};
