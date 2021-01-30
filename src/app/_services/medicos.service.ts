import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { MedicoRetorno } from '../_models/medico_retorno';
import { Medico } from '../_models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private API_URL: string = `${environment.apiUrl}/medicos`;

  private reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getAll() {          
    return this.http.get<MedicoRetorno>(this.API_URL, { headers: this.reqHeader });
  }

  getByID(id: any) {          
    return this.http.get<MedicoRetorno>(this.API_URL+'/'+id, { headers: this.reqHeader });
  } 

  create(dados: null): Observable<Medico> {
    return this.http.post<Medico>(this.API_URL+'/salvar', JSON.stringify(dados), { headers: this.reqHeader })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(dados: null, id: any): Observable<Medico> {
    return this.http.post<Medico>(this.API_URL+'/atualizar/'+id, JSON.stringify(dados), { headers: this.reqHeader })
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
