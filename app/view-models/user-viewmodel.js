function UserViewModel(opts) {
    if (!opts) opts = {};
    this.name = opts.name || undefined;
    this.login = opts.login || undefined;
    this.songRefs = opts.songRefs || [];
}

module.exports = UserViewModel;