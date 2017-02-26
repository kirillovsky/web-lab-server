function Song(opts) {
    if (!opts) opts = {};
    this.id = opts.id || 0;
    this.title = opts.title || '';
    this.singer = opts.singer || '';
    this.globalRating = opts.globalRating || 0;
    this.userRating = opts.userRating || 0;
    this.imageSrc = opts.imageSrc || '';
}

module.exports = Song;