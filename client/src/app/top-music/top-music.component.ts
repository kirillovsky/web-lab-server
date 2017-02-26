import { Component } from '@angular/core';
import { Song } from '../song.model'

@Component({
    selector: 'top-music',
    templateUrl: './top-music.component.html'
})
export class TopMusicComponent {
    songList: Song[] = [];

    constructor() {
        let song = new Song();
        song.id = 1;
        song.singer = 'JAM Project';
        song.title = 'THE HERO !!';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);

        song = new Song();
        song.id = 2;
        song.singer = 'Saitama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);

        song = new Song();
        song.id = 3;
        song.singer = 'Rick Astley';
        song.title = 'Never Gonna Give You Up';
        song.globalRating = 8;
        song.userRating = 9;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);

        song = new Song();
        song.id = 4;
        song.singer = 'Ontama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);

        song = new Song();
        song.id = 5;
        song.singer = 'Gintama';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);

        song = new Song();
        song.id = 6;
        song.singer = 'Bandana';
        song.title = 'One Puuuuuuunch';
        song.globalRating = 7.5;
        song.userRating = 4;
        song.imageSrc = '/assets/img/opm.png';
        this.songList.push(song);
    }
}
