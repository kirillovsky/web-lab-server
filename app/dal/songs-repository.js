var Repository = require('./repository'),
    Song = require('../models/song');

class SongsRepository extends Repository {
    constructor() {
        super('songs');
    }
    
    _getEntity(entity) {
        return new Song(entity);
     }
}

module.exports = SongsRepository;