import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, tap, map } from 'rxjs/operators';
import { ICast, IProdCo, ITrailer, IProviders } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private baseURL = 'https://api.themoviedb.org/3/movie/';
  private APIkey = 'Your-API-Key';

  constructor(private http: HttpClient) { }
  
  getProdCompanies(id: string): Observable<IProdCo[]> {
    let params = new HttpParams()
      .set('api_key',this.APIkey)
      .set('language','en-US')
    return this.http.get<any>(this.baseURL + id, {params}).pipe(
      map(data => data.production_companies),
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getCast(id: string): Observable<ICast[]> {
    let params = new HttpParams()
      .set('api_key',this.APIkey)
      .set('language','en-US')
    return this.http.get<any>(this.baseURL + id + '/credits?', {params}).pipe(
      map(data => data.cast),
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getTrailer(id: string): Observable<ITrailer[]> {
    let params = new HttpParams()
      .set('api_key',this.APIkey)
      .set('language','en-US')
    return this.http.get<any>(this.baseURL + id + '/videos?', {params}).pipe(
      map(data => data.results),
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
