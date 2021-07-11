import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap } from 'rxjs/operators';

import { IResponse } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieDbURL ='https://api.themoviedb.org/3/discover/movie?';
  private APIkey = 'Your-API-Key';
  constructor(private http: HttpClient) { }

  getMovies(genre: string, page: number, sort: string): Observable<IResponse> {
    let params = new HttpParams()
      .set('api_key', this.APIkey)
      .set('language', 'en-US')
      .set('sort_by', sort)
      .set('include_adult', 'false')
      .set('page', page)
      .set('with_watch_monetization_types','flatrate')
      .set('with_genres', genre);
    return this.http.get<IResponse>(this.movieDbURL, {params}).pipe(
      tap(data => console.log(data)),
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
