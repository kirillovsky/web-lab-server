var express = require('express'),
    router = express.Router();

module.exports = (app) => {
    app.use('/', router);
};

router.get('/', (req, res, next) => {
    res.render('index.html');
});

router.get('/top', (req, res, next) => {
    res.redirect('/');
});

router.get('/my-music', (req, res, next) => {
    res.redirect('/');
});

router.get('/user', (req, res, next) => {
    res.redirect('/');
});

router.get('/login', (req, res, next) => {
    res.redirect('/');
});
