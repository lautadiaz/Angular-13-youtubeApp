import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private parametros = {
      key        : 'AIzaSyADmbTBKE0y69kO-PnrX0YiZ4-y6-pMZmk',
      playlistId : 'UUtakZatUqY-XaihWfMnz07w',
      part       : 'snippet',
      maxResults : 12,
      pageToken  : ''
  };
  private url: string = 'https://www.googleapis.com/youtube/v3'

  constructor( private http:HttpClient) {}

   getLista() {
      return this.http.get<YoutubeResponse>( `${this.url}/playlistItems`, { params: this.parametros} )
                .pipe(
                  map( resp => {
                    this.parametros.pageToken = resp.nextPageToken;
                    return resp.items;
                  }),
                  map( items => items.map( video => video.snippet))
                );
   }
}
