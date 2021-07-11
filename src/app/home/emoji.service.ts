import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap } from 'rxjs/operators';

import { IEmoji, ISort } from '../shared/interface';
@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private emojiURL ='sharedData/emoji.json';
  private sortURL ='sharedData/sorts.json';

  constructor(private http: HttpClient) { }

  getEmoji(): Observable<IEmoji[]> {
    return this.http.get<IEmoji[]>(this.emojiURL).pipe(
      catchError(this.handleError)
    );
  }

  getSorts(): Observable<ISort[]> {
    return this.http.get<ISort[]>(this.sortURL).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //A client-side or network error occured.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      //The backend returned an unsuccesful response code
      //the response body ma contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}