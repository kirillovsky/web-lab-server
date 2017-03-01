class SongReference {
    constructor(opts) {
        if (!opts) opts = {};
        this.id = opts.id;
        this.inCollection = opts.inCollection || false;
    }
}

module.exports = SongReference;