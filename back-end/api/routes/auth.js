const router = require('express').Router();

router.post('/login', (req, res) => {
    res.send('로그인');
});
router.post('/register', (req, res) => {
    res.send('회원가입');
});

module.exports = router;
