var UsersRepository = require('../dal/users-repository'),
    SongsRepository = require('../dal/songs-repository'),
    User = require('../models/user'),
    Song = require('../models/song'),
    SongRef = require('../models/song-reference');

var usersRepository = new UsersRepository();
var songsRepository = new SongsRepository();

class UserService {
    updateUserRating(user, songId, newRating) {
        return songsRepository.getBy(songId).then(song => {
            this._removeOldRate(song, user.id);
            song.userRates.push({
                userId: user.id,
                rate: newRating
            });
            this._recalculateGlobalRating(song);
            return songsRepository.updateBy(song.id, song);
        });
    }

    addSong(userId, songId) {
        return this._getBy(userId).then(user => {
            if(user.songRefs.find(s => s.id == songId) == null) {
                let songRef = new SongRef({
                    id: songId, 
                    inCollection: true
                });
                user.songRefs.push(songRef);
            }
            return this.updateBy(userId, user)
                .then(user => user.songRefs);
        });
    }

    removeSong(userId, songId) {
        return this.getBy(userId).then(user => {
            let songRef = user.songRefs.find(s => s.id == songId);
            let ind = user.songRefs.indexOf(songRef);
            if(ind != -1) {
                user.songRefs.splice(ind, 1);
            }
            return this.updateBy(userId, user)
                .then(user => user.songRefs);
        });
    }

    _recalculateGlobalRating(song, newRate) {
        //return (song.globalRating * song.ratesCount + newRate) / (song.ratesCount + 1);
        // TODO: Пересчет рейтинга.
    }

    _removeOldRate(song, userId) {
        let oldRate = song.userRates.find(r => r.userId == userId);
        let ind = song.userRates.indexOf(oldRate);
        song.userRates.splice(ind, 1);
    }
}

module.exports = UserService;