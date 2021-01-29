import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { UserRetorno } from '../_models/user_retorno';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL: string = `${environment.apiUrl}/users`;

  private reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getAll() {          
    return this.http.get<UserRetorno>(this.API_URL, { headers: this.reqHeader });
  }

  create(dados: null): Observable<User> {
    return this.http.post<User>(this.API_URL, JSON.stringify(dados), { headers: this.reqHeader })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}