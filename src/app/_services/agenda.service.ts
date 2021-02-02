import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Agenda } from '../_models/agenda';
import { AgendaRetorno } from '../_models/agenda_retorno';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private API_URL: string = `${environment.apiUrl}/agendamentos`;

  private reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getAll() {          
    return this.http.get<any>(this.API_URL, { headers: this.reqHeader });
  }

  getByID(id: any) {          
    return this.http.get<Agenda>(this.API_URL+'/'+id, { headers: this.reqHeader });
  } 

  create(dados: null): Observable<Agenda> {
    return this.http.post<Agenda>(this.API_URL+'/salvar', JSON.stringify(dados), { headers: this.reqHeader })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(dados: null, id: any): Observable<Agenda> {
    return this.http.post<Agenda>(this.API_URL+'/atualizar/'+id, JSON.stringify(dados), { headers: this.reqHeader })
    .pipe(
      catchError(this.errorHandler)
    )        
  }

  delete(id: any): Observable<null> {  
    return this.http.get(this.API_URL+'/deletar/'+id, { headers: this.reqHeader })
    .pipe(
      catchError(this.errorHandler),
      map(() => null)
    )
  }

  errorHandler(error: { error: { message: { original: {message: string; }}}; status: any; message: any; }) {
    let errorMessage = ''; 
    errorMessage = error.error.message.original.message;    
    return throwError(errorMessage);
  }

}
