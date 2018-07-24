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
  private params = {
    exc: 'login', // exclude login (because it's heavy)
    seed: uuidv4(),
    results: 10, // take 10 per page
    page: 1
  };

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<User[]> {
    const url = this.buildUrl({
      ...this.params,
      page
    }, this.userUrl);
    return this.http.get<{results: User[]}>(url)
    .pipe(
      pluck<{results: User[]}, User[]>('results'),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  private buildUrl(params: Record<string, string | number>, url: string): string {
    return Object.keys(params).reduce((paramStr, key) => {
      return paramStr.concat( `${key}=${params[key]}&` );
    }, `${url}/?`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
