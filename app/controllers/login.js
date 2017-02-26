var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Token = require('../models/token');

var tempUser = new User({
    name: 'Oleg',
    login: 'sys',
    password: '123'
});

var users = [tempUser];
var tokens = [];

module.exports = function (app) {
    app.use('/login', router);
};

router.get('/', function (req, res, next) {
    res.render('login', {
      title: 'Вход'
    });
});

router.post('/', function (req, res, next) {
    let login = req.body.login || '';
    let password = req.body.password || '';

    let user = users.find(e => e.login === login);
    if (user && user.password === password) {
        let token = Token.generate();
        tokens.push(token);
        res.send(token);
    } else {
        res.send(401, 'Неверная пара логин/пароль');
    }
});
