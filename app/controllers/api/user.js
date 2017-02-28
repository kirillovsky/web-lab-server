var express = require('express'),
    router = express.Router(),
    Song = require('../../models/song'),
    User = require('../../models/user'),
    SongsRepository = require('../../dal/songs-repository'),
    Token = require('../../models/token');

module.exports = function (app) {
    app.use('/api/user', router);
};

var songsRepository = new SongsRepository();

var simple_token = Token.generate;
simple_token.value = 'kokoko';
var usersTokens = [
    {
        user: new User({
            id: 10,
            name: 'Олеган',
            login: 'sys',
            password: '123',
            songsIds: []
        }),
        token: simple_token
    }
];

function getCurrentUser(req) {
    let token = req.headers['token'];
    let userToken = usersTokens.find(ut => ut.token.value === token);
    let user = userToken.user;
    return user;
}

function normalizeId(song) {
    var result = song;
    result.id = result._id;
    result._id = undefined;
    return result;
}

router.get('/', (req, res, next) => {
    // TODO: Not Implemented.
    let user = getCurrentUser(req);
});

router.get('/songs', (req, res, next) => {
    // TODO: Not Implemented.
    let user = getCurrentUser(req);
    if(user){
        let songs = songsRepository.getAllBy(user.songsIds);
        res.json(songs);
    } else {
        res.send(401, 'Incorrect Token');
    }
});

router.post('/songs', (req, res, next) => {
    return;
});

router.delete('/songs', (req, res, next) => {
    // TODO: Not Implemented.
    return;
});
