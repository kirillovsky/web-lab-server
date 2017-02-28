var mongojs = require('mongojs'),
    Song = require('../models/song');

function normalizeId(song) {
    var result = song;
    result.id = result._id;
    result._id = undefined;
    return result;
}

class Repository {
    constructor(entity) {
        this.db = mongojs('mongodb://localhost:27017/myproject', [entity]);
        this.entity = entity;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db[this.entity].find((err, songs) => {
                if(err) {
                    reject(err);
                } else {
                    songs = songs.map(s => normalizeId(s));
                    resolve(songs);
                }
            });
        });
    }

    getAllBy(ids) {
        return this.getAll().then(songs => {
            return songs.filter(s => ids.contains(s.id));
        });
    }

    getBy(id) {
        return this._getBy(id)
            .then(song => normalizeId(song));
    }


    save(newSong) {
        return new Promise((resolve, reject) => {
            this.db[this.entity].save(newSong, (err, song) => {
                if(err) {
                    reject(err);
                } else {
                    song = normalizeId(song);
                    resolve(song);
                }
            });
        });
    }

    update(id, patch) {
        // TODO: Разобраться, как запилить patch в моне.
        return this._getBy(id).then((song) => {
            return new Promise((resolve, reject) => {
                let idObj = {_id: new mongojs.ObjectID(id) };
                Object.assign(song, patch);
                this.db[this.entity].update(idObj, song, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        song = normalizeId(song);
                        resolve(song);
                    }
                });
            });
        });
    }

    _getBy(id) {
        return new Promise((resolve, reject) => {
            let idObj = {_id:  new mongojs.ObjectID(id) };
            this.db[this.entity].findOne(idObj, (err, song) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(song);
                }
            });
        });
    }
}

module.exports = Repository;