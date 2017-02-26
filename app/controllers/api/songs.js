var express = require('express'),
    router = express.Router(),
    Song = require('../../models/song');

module.exports = function (app) {
    app.use('/api/songs', router);
};

var songList = [];

var initData = function() {
    let song = new Song();
        song.id = 1;
        song.singer = 'JAM Project';
        song.title = 'THE HERO !!';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = true;
        songList.push(song);

        song = new Song();
        song.id = 2;
        song.singer = 'Saitama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = true;
        songList.push(song);

        song = new Song();
        song.id = 3;
        song.singer = 'Rick Astley';
        song.title = 'Never Gonna Give You Up';
        song.globalRating = 8;
        song.userRating = 9;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = false;
        songList.push(song);

        song = new Song();
        song.id = 4;
        song.singer = 'Ontama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = true;
        songList.push(song);

        song = new Song();
        song.id = 5;
        song.singer = 'Gintama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = false;
        songList.push(song);

        song = new Song();
        song.id = 6;
        song.singer = 'Bandana';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        song.inCollection = true;
        songList.push(song);
}
initData();

router.get('/', (req, res, next) => {
    // TODO: Not Implemented.
    res.send(songList);
});

router.get('/collection', (req, res, next) => {
    // TODO: Not Implemented.
    let filtered = [songList[0]];
    res.send(filtered);
});

router.post('/', (req, res, next) => {
    // TODO: Not Implemented.
    let newSong = req.body;
    res.send(newSong);
});

router.post('/:id', (req, res, next) => {
    // TODO: Not Implemented.
    let song_id = req.params.id;
    let patch = req.body;
    let patchedSong = new Song(patch);
    res.send(patchedSong);
});

router.post('/:id/addToCollection', (req, res, next) => {
    // TODO: Not Implemented.
    let song_id = req.params.id;
    res.send(null);
});

router.post('/:id/removeFromCollection', (req, res, next) => {
    // TODO: Not Implemented.
    let song_id = req.params.id;
    res.send(null);
});