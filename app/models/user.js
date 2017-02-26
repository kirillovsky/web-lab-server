function User(opts) {
    if (!opts) opts = {};
    this.name = opts.name || '';
    this.login = opts.login || '';
    this.password = opts.password || '';
}

module.exports = User;