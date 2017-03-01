var express = require('express'),
    router = express.Router(),
    SongsRepository = require('../../dal/songs-repository'),
    Song = require('../../models/song'),
    SongViewModel = require('../../view-models/song-viewmodel');

var defaultSongImage = '/api/images/default.png';
var songsRepository = new SongsRepository();

var authService;
module.exports = function (app, _authService) {
    app.use('/api/songs', router);
    authService = _authService;
};

function handleError(res, err) {
    res.send(500, err);
}

// TOOLS.
function removeAllSongs() {
    songsRepository.getAll().then(songs => {
        songs.forEach(song => {
            songsRepository.removeBy(song.id);
        });
    });
}
router.get('/removeAll', (req, res, next) => {
    removeAllSongs();
    res.send('all songs removed');
});

router.get('/', (req, res, next) => {
    songsRepository.getAll().then(
        songs => {
            let user = authService.getCurrentUser(req);
            if(user) {
                songs = songs.map(s => SongViewModel.fromSongAndUser(s, user));
            }
            res.json(songs)
        },
        err => handleError(res, err)
    );
});

router.post('/', (req, res, next) => {
    let newSong = req.body;
    if(!newSong.imageSrc) {
        newSong.imageSrc = defaultSongImage;
    }
    songsRepository.save(newSong).then(
        song => res.json(201, song),
        err => handleError(res, err)
    );
});

// Не используется.
router.put('/:id', (req, res, next) => {
    let user = authService.getCurrentUser(req);
    if(user) {
        let song_id = req.params.id;
        let patch = req.body;
        songsRepository.updateBy(song_id, patch).then(
            song => res.json(song),
            err => handleError(res, err)
        );
    } else {
        res.send(401, 'Invalid Token');
    }
});
