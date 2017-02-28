var Repository = require('./repository'),
    User = require('../models/user');

class UsersRepository extends Repository {
    constructor() {
        super('users');
    }

    _getEntity(entity) {
        return new User(entity);
     }

    // TODO: Move to Service Layer.
    addSong(userId, songId) {
        return this._getBy(userId).then(user => {
            if(user.songsIds.indexOf(songId) == -1) {
                user.songsIds.push(songId);
            }
            return this.update(userId, user)
                .then(user => user.songsIds);
        });
    }

    // TODO: Move to Service Layer.
    removeSong(userId, songId) {
        return this.getBy(userId).then(user => {
            let ind = user.songsIds.indexOf(songId);
            if(ind != -1) {
                user.songsIds.splice(ind, 1);
            }
            return this.update(userId, user)
                .then(user => user.songsIds);
        });
    }
}

module.exports = UsersRepository;