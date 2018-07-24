import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

import { User } from './user';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{results: User[]}>(this.userUrl)
    .pipe(
      pluck<{results: User[]}, User[]>('results'),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /**
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
