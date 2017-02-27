function Song(opts) {
    if (!opts) opts = {};
    this.id = undefined;
    this.title = opts.title || undefined;
    this.singer = opts.singer || undefined;
    this.globalRating = opts.globalRating || undefined;
    this.ratesCount = opts.ratesCount || 0;
    this.imageSrc = opts.imageSrc || undefined;

    //TODO: Выпилить.
    this.userRating = opts.userRating || undefined;
    this.inCollection = opts.inCollection || false;
}

module.exports = Song;