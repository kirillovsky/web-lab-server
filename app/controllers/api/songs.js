var express = require('express'),
    router = express.Router(),
    SongsRepository = require('../../dal/songs-repository'),
    Song = require('../../models/song');

var defaultSongImage = '/api/images/default.png';
var songsRepository = new SongsRepository();


module.exports = function (app) {
    app.use('/api/songs', router);
};

function normalizeId(song) {
    var result = song;
    result.id = result._id;
    result._id = undefined;
    return result;
}

function handleError(res, err) {
    res.send(500, err);
}

router.get('/', (req, res, next) => {
    songsRepository.getAll().then(
        songs => res.json(songs),
        err => handleError(res, err)
    );
});

router.get('/removeAll', (req, res, next) => {
    // TODO: Not Implemented.
    res.send('Commented');
    return;
    // db.songs.find((err, songs) => {
    //     if(err) {
    //         res.send(500, err);
    //     } else {
    //         //songs = songs.map(s => normalizeId(s));
    //         //res.json(songs);
    //         songs.forEach(s => {
    //             let str = s._id.toString();
    //             let idObj = {_id:  new mongojs.ObjectID(str) };
    //             db.songs.remove(idObj, (err, result) => {
    //                 if(err){
    //                     console.log('fail');
    //                 } else {
    //                     console.log(result);
    //                 }
    //             });
    //         });
    //     }
    // });
});

router.post('/', (req, res, next) => {
    let newSong = req.body;
    if(!newSong.imageSrc) {
        newSong.imageSrc = defaultSongImage;
    }
    songsRepository.save(newSong).then(
        song => res.json(song),
        err => handleError(res, err)
    );
});

router.put('/:id', (req, res, next) => {
    let song_id = req.params.id;
    let patch = req.body;
    songsRepository.update(song_id, patch).then(
        song => res.json(song),
        err => handleError(res, err)
    );
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