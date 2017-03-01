// class SongViewModel {
//     constructor(opts) {
//         if (!opts) opts = {};
//         this.id = undefined;
//         this.title = opts.title || undefined;
//         this.singer = opts.singer || undefined;
//         this.globalRating = opts.globalRating || undefined;
//         this.ratesCount = opts.ratesCount || 0;
//         this.imageSrc = opts.imageSrc || undefined;

//         this.userRating = opts.userRating || undefined;
//         this.inCollection = opts.inCollection || false;
//     }

//     constructor(song, user) {
//         this(song);
//         this.inCollection = true;
//         let songRef = user.songRefs.find(s => s.id);
//         if(!songRef) {
//             throw new Exception('У пользователя нет такой песни');
//         }
//         this.userRating = songRef.userRating;
//     }
// }

function SongViewModel(opts) {
    if (!opts) opts = {};
    this.id = opts.id || undefined;
    this.title = opts.title || undefined;
    this.singer = opts.singer || undefined;
    this.globalRating = opts.globalRating || undefined;
    this.ratesCount = opts.ratesCount || 0;
    this.imageSrc = opts.imageSrc || undefined;

    this.userRating = opts.userRating || undefined;
    this.inCollection = opts.inCollection || false;
}

SongViewModel.fromSongAndUser = (song, user) => {
    let result = new SongViewModel(song);
    let songRef = user.songRefs.find(s => s.id == song.id);
    let userRate = song.userRates.find(r => r.userId == user.id);

    if(songRef) {
        result.inCollection = songRef.inCollection || false;
    } else {
        result.inCollection = false;
    }
    
    result.userRating = userRate ? userRate.rate : 0;
    result.ratesCount = song.userRates.length;

    return result;
}


module.exports = SongViewModel;