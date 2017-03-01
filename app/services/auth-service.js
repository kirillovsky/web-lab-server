var UsersRepository = require('../dal/users-repository'),
    User = require('../models/user'),
    Token = require('../models/token');

var usersRepository = new UsersRepository();

class AuthService {
    constructor() {
        this.usersLoginInfo = [];
    }

    getCurrentUser(req) {
        let token = req.headers['token'];
        let userLoginInfo = this.usersLoginInfo[token];
        if(userLoginInfo) {
            let user = userLoginInfo.user;
            //TODO: Если протух -- удаляем и возвращаем null.
            return user;
        } else {
            return null;
        }
    }

    authenticateUser(user) {
        let token = Token.generate();
        this.usersLoginInfo[token.value] = {
            user: user,
            token: token
        };
        return {token: token, username: user.name};
    }

    updateUserLoginInfo(req) {
        let token = req.headers['token'];
        let loginInfo = this.usersLoginInfo[token];
        if(loginInfo) {
            let user = loginInfo.user;
            usersRepository.getBy(user.id)
                .then(newUser => loginInfo.user = newUser);
        }
    }

    logoutUser(req) {
        let token = req.headers['token'];
        this.usersLoginInfo[token] = undefined;
    }
}

module.exports = AuthService;