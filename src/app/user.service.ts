import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import uuidv4 from 'uuidv4';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://randomuser.me/api';
  private params: Record<string, string> = {
    exc: 'login', // exclude login always (because it's heavy)
    seed: uuidv4(),
    results: '10', // take 10 per page
    page: '0'
  };

  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return this.buildUrl(this.params, this.userUrl);
  }

  /**
   * Return list of users from API
   *
   * NOTE: function contains side effect that increments params.page
   */
  getUsers(): Observable<User[]> {
    this.incrementPage();
    return this.http.get<{results: User[]}>(this.apiUrl)
    .pipe(
      pluck<{results: User[]}, User[]>('results'),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  incrementPage() {
    this.params.page = (Number.parseInt(this.params.page) + 1).toString();
  }

  private buildUrl(params: Record<string, string>, url: string): string {
    return Object.keys(params).reduce((paramStr, key) => {
      return paramStr.concat( `${key}=${params[key]}&` );
    }, `${url}/?`);
  }

  /**
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
