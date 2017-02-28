function User(opts) {
    if (!opts) opts = {};
    this.id = undefined
    this.name = opts.name || undefined;
    this.login = opts.login || undefined;
    this.password = opts.password || undefined;
    this.songsIds = opts.songsIds || [];
}

module.exports = User;