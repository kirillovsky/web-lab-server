var express = require('express'),
    router = express.Router(),
    Song = require('../../models/song'),
    User = require('../../models/user'),
    UserViewModel = require('../../view-models/user-viewmodel'),
    SongsRepository = require('../../dal/songs-repository'),
    UsersRepository = require('../../dal/users-repository'),
    Token = require('../../models/token');

module.exports = function (app) {
    app.use('/api/user', router);
};

var songsRepository = new SongsRepository();
var usersRepository = new UsersRepository();

function handleError(res, err) {
    res.send(500, err);
}

usersLoginInfo = [];

function getCurrentUser(req) {
    let token = req.headers['token'];
    let userLoginInfo = usersLoginInfo[token];
    if(userLoginInfo) {
        let user = userLoginInfo.user;
        //TODO: Если протух -- удаляем и возвращаем null.
        return user;
    } else {
        return null;
    }
}

function authenticateUser(user) {
    let token = Token.generate();
    usersLoginInfo[token.value] = {
        user: user,
        token: token
    };
    return {token: token, username: user.name};
}

function updateUserLoginInfo(req) {
    let token = req.headers['token'];
    let loginInfo = usersLoginInfo[token];
    if(loginInfo) {
        let user = loginInfo.user;
        usersRepository.getBy(user.id)
            .then(newUser => loginInfo.user = newUser);
    }
}

function logoutUser(tokenVal) {
    usersTokens[tokenVal] = undefined;
}

router.get('/', (req, res, next) => {
    let user = getCurrentUser(req);
    if(user){
        res.json(new UserViewModel(user));
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.post('/', (req, res, next) => {
    let newUser = new User(req.body);
    usersRepository.save(newUser).then(
        user => res.json(new UserViewModel(user)),
        err => handleError(res, err)
    );
});

router.post('/login', (req, res, next) => {
    let login = req.body['login'];
    let password = req.body['password'];
    usersRepository.findOne({login: login, password: password}).then(
        user => {
            if(!user) {
                res.send(401, 'Неверная пара логин/пароль');
            } else {
                let authResult = authenticateUser(user);
                res.json(authResult);
            }
        },
        err => handleError(res, err)
    );
});

router.post('/logout', (req, res, next) => {
    let token = req.headers['token'];
    logoutUser(token);
    res.send(200);
});

router.post('/register', (req, res, next) => {
    let userObj = new User(req.body);
    usersRepository.save(userObj).then(user => {
        let authResult = authenticateUser(user);
        res.json(201, authResult);
    })
    .catch(err => handleError(res, err));
});

router.get('/songs', (req, res, next) => {
    let user = getCurrentUser(req);
    if(user){
        songsRepository.getAllBy(user.songsIds)
            .then(songs => songs.map(s => {s.inCollection = true; return s;}))
            .then(songs =>res.json(songs));
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.post('/songs/:id', (req, res, next) => {
    let user = getCurrentUser(req);
    if(user){
        let song_id = req.params.id;
        usersRepository.addSong(user.id, song_id)
            .then(songs =>res.json({}))
            .then(() => updateUserLoginInfo(req))
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.delete('/songs/:id', (req, res, next) => {
    let user = getCurrentUser(req);
    if(user){
        let song_id = req.params.id;
        usersRepository.removeSong(user.id, song_id)
            .then(() =>res.json({}))
            .then(() => updateUserLoginInfo(req));
    } else {
        res.send(401, 'Incorrect Token');
    }
});
