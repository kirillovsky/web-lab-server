var Repository = require('./repository'),
    User = require('../models/user');

class UsersRepository extends Repository {
    constructor() {
        super('users');
    }

    _getEntity(entity) {
        return new User(entity);
     }
}

module.exports = UsersRepository;