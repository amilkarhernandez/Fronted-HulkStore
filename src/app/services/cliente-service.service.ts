import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Clientes } from '../models/Clientes';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/clientes';


  constructor(private http: HttpClient, private router: Router) { }


  getListClientes(): Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.urlendpoint);
  }

  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes> (this.urlendpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.satus == 400){
          return throwError(e);
        }

        swal('Error al Crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Clientes>{
    return this.http.get<Clientes>(`${this.urlendpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        swal('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  } 

  updateCliente(cliente: Clientes): Observable<Clientes>{
    return this.http.put<Clientes>(`${this.urlendpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.satus == 400){
          return throwError(e);
        }
        swal('Error al Actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteCliente(id: number): Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlendpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal('Error al Eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
