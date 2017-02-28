var Repository = require('./repository'),
    Song = require('../models/song');

class SongsRepository extends Repository {
    constructor() {
        super('songs');
    }

    // TODO: Move to Service Layer.
    update(id, patch) {
        return this.getBy(id).then((song) => {
            if(patch.userRating) {
                patch.globalRating = this._recalculateGlobalRating(song, patch.userRating);
                patch.ratesCount = song.ratesCount + 1;
            }
            return super.update(id, patch);
        });
    }

    _recalculateGlobalRating(song, newRate) {
        return (song.globalRating * song.ratesCount + newRate) / (song.ratesCount + 1);
    }
}

module.exports = SongsRepository;