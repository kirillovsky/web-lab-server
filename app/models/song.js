function Song(opts) {
    if (!opts) opts = {};
    this.id = undefined;
    this.title = opts.title || undefined;
    this.singer = opts.singer || undefined;
    this.globalRating = opts.globalRating || 0;
    this.imageSrc = opts.imageSrc || undefined;
    this.userRates = opts.userRates || [];
}

module.exports = Song;