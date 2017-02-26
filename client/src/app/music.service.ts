import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Song } from './song.model'
import { Observable } from 'rxjs'

@Injectable()
export class MusicService {
    private apiEndpoint: string = 'http://localhost:3000/api/songs';

    constructor(private http: Http) {
    }

    updateUserRating(id: number, newRating: number): Promise<number> {
        const endpoint = this.apiEndpoint + `/${id}`;
        // return this.http.post(endpoint, { userRating: newRating })
        //     .map((result: Response) => result.json())
        //     .map((result: Song) => result.userRating)
        //     .toPromise();
        this.http.post(endpoint, { userRating: newRating })
            .subscribe(res => console.log(res));

        return new Promise<number>(() => {});
    }
}