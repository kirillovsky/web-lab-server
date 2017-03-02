var express = require('express'),
    router = express.Router(),
    Song = require('../../models/song'),
    User = require('../../models/user'),
    SongViewModel = require('../../view-models/song-viewmodel'),
    UserViewModel = require('../../view-models/user-viewmodel'),
    SongsRepository = require('../../dal/songs-repository'),
    UsersRepository = require('../../dal/users-repository'),
    UserService = require('../../services/user-service'),
    Token = require('../../models/token');

var authService;
module.exports = function (app, _authService) {
    app.use('/api/user', router);
    authService = _authService;
};

var songsRepository = new SongsRepository();
var usersRepository = new UsersRepository();
var userService = new UserService();

function handleError(res, err) {
    res.send(500, err);
}

// TOOLS.
function removeAllUsers() {
    usersRepository.getAll().then(users => {
        users.forEach(user => {
            usersRepository.removeBy(user.id);
        });
    });
}
router.get('/removeAll', (req, res, next) => {
    removeAllUsers();
    res.send('all users removed');
});

router.get('/', (req, res, next) => {
    let user = authService.getCurrentUser(req);
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
                let authResult = authService.authenticateUser(user);
                res.json(authResult);
            }
        },
        err => handleError(res, err)
    );
});

router.post('/logout', (req, res, next) => {
    authService.logoutUser(req);
    res.send(200);
});

router.post('/register', (req, res, next) => {
    let userObj = new User(req.body);
    usersRepository.save(userObj).then(user => {
        let authResult = authService.authenticateUser(user);
        res.json(201, authResult);
    })
    .catch(err => handleError(res, err));
});

router.get('/songs', (req, res, next) => {
    let user = authService.getCurrentUser(req);
    if(user){
        songsRepository.getAllBy(user.songRefs.map(s => s.id))
            .then(songs => songs.sort((a, b) => b.globalRating - a.globalRating))
            .then(songs => songs.map(s => SongViewModel.fromSongAndUser(s, user)))
            .then(songs =>res.json(songs));
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.post('/songs/:id', (req, res, next) => {
    let user = authService.getCurrentUser(req);
    if(user){
        let songId = req.params.id;
        userService.addSong(user.id, songId)
            .then(songs => res.json({}))
            .then(() => authService.updateUserLoginInfo(req));
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.post('/songs/:id/rate/:newRating', (req, res, next) => {
    let user = authService.getCurrentUser(req);
    if(user){
        let songId = req.params.id;
        let newRating = req.params.newRating;
        userService.updateUserRating(user, songId, newRating)
            .then(song => res.json(SongViewModel.fromSongAndUser(song, user)))
            .catch(err => handleError(res, err));
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.delete('/songs/:id', (req, res, next) => {
    let user = authService.getCurrentUser(req);
    if(user){
        let song_id = req.params.id;
        userService.removeSong(user.id, song_id)
            .then(() =>res.json({}))
            .then(() => authService.updateUserLoginInfo(req));
    } else {
        res.send(401, 'Incorrect Token');
    }
});
