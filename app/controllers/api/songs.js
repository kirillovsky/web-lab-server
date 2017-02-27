var express = require('express'),
    router = express.Router(),
    mongojs = require('mongojs'),
    Song = require('../../models/song');

var db = mongojs('mongodb://localhost:27017/myproject', ['songs']);

var defaultSongImage = '/api/images/default.png';

module.exports = function (app) {
    app.use('/api/songs', router);
};

function normalizeId(song) {
    var result = song;
    result.id = result._id;
    result._id = undefined;
    return result;
}

router.get('/', (req, res, next) => {
    db.songs.find((err, songs) => {
        if(err) {
            res.send(500, err);
        } else {
            songs = songs.map(s => normalizeId(s));
            res.json(songs);
        }
    });
});

router.get('/collection', (req, res, next) => {
    // TODO: Not Implemented.
    return;
    db.songs.find((err, songs) => {
        if(err) {
            res.send(500, err);
        } else {
            //songs = songs.map(s => normalizeId(s));
            //res.json(songs);
            songs.forEach(s => {
                let str = s._id.toString();
                let idObj = {_id:  new mongojs.ObjectID(str) };
                db.songs.remove(idObj, (err, result) => {
                    if(err){
                        console.log('fail');
                    } else {
                        console.log(result);
                    }
                });
            });
        }
    });
});

router.post('/', (req, res, next) => {
    let newSong = req.body;
    if(!newSong.imageSrc) {
        newSong.imageSrc = defaultSongImage;
    }
    db.songs.save(newSong, (err, song) => {
        if(err) {
            res.send(500, err);
        } else {
            song = normalizeId(song);
            res.json(song);
        }
    });
});

router.put('/:id', (req, res, next) => {
    let song_id = req.params.id;
    let idObj = {_id:  new mongojs.ObjectID(song_id) };
    let patch = req.body;
    db.songs.findOne(idObj, (err, song) => {
        if(err) {
            res.send(500, err);
        } else {
            if(patch.userRating) {
                patch.globalRating = (song.globalRating*song.ratesCount + patch.userRating) / (song.ratesCount + 1);
                patch.ratesCount = song.ratesCount + 1;
            }
            Object.assign(song, patch);
            db.songs.update(idObj, song, (err, result) => {
                if(err) {
                    res.send(500, err);
                } else {
                    song = normalizeId(song);
                    res.json(song);
                }
            });
        }
    });

    
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