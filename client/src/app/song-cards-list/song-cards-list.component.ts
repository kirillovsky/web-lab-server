import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../song.model'

@Component({
    selector: 'song-cards-list',
    templateUrl: './song-cards-list.component.html',
    styleUrls: ['./song-cards-list.component.css'] 
})
export class SongCardsListComponent {
    @Input() model: Song[];
}
