var UsersRepository = require('../dal/users-repository'),
    SongsRepository = require('../dal/songs-repository'),
    User = require('../models/user'),
    Song = require('../models/song'),
    SongRef = require('../models/song-reference');

var usersRepository = new UsersRepository();
var songsRepository = new SongsRepository();

class UserService {
    updateUserRating(user, songId, newRating) {
        newRating = Number(newRating);
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
        return usersRepository.getBy(userId).then(user => {
            if(user.songRefs.find(s => s.id == songId) == null) {
                let songRef = new SongRef({
                    id: songId, 
                    inCollection: true
                });
                user.songRefs.push(songRef);
            }
            return usersRepository.updateBy(userId, user)
                .then(user => user.songRefs);
        });
    }

    removeSong(userId, songId) {
        return usersRepository.getBy(userId).then(user => {
            let songRef = user.songRefs.find(s => s.id == songId);
            let ind = user.songRefs.indexOf(songRef);
            if(ind != -1) {
                user.songRefs.splice(ind, 1);
            }
            return usersRepository.updateBy(userId, user)
                .then(user => user.songRefs);
        });
    }

    _recalculateGlobalRating(song) {
        let ratesSum = song.userRates.map(s => Number(s.rate))
            .reduce((a, b) => a + b, 0);
        let newGlobalRate = ratesSum / song.userRates.length;
        song.globalRating = newGlobalRate;
    }

    _removeOldRate(song, userId) {
        let oldRate = song.userRates.find(r => r.userId == userId);
        if(oldRate) {
            let ind = song.userRates.indexOf(oldRate);
            song.userRates.splice(ind, 1);
        }
    }
}

module.exports = UserService;