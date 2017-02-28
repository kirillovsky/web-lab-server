function UserViewModel(opts) {
    if (!opts) opts = {};
    this.name = opts.name || undefined;
    this.login = opts.login || undefined;
    this.songsIds = opts.songsIds || [];
}

module.exports = UserViewModel;