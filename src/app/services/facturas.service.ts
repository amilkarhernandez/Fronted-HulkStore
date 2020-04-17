import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Factura } from '../models/Factura';
import { Productos } from '../models/Productos';
import { ProductoService } from './producto.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/facturas';


  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlendpoint}/${id}`);
  }

  delete(id: number):Observable<void>{
    return this.http.delete<void>(`${this.urlendpoint}/${id}`);
  }

  filtrarProductos(term: String): Observable<Productos[]>{
    return this.http.get<Productos[]>(`${this.urlendpoint}/filtrarproductos/${term}`);
  }

  //create(factura: Factura): Observable<Factura> {
  //  return this.http.post<Factura>(this.urlendpoint, factura);
 // }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura> (this.urlendpoint, factura, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.satus == 400){
          return throwError(e);
        }
        swal('Error al Crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
