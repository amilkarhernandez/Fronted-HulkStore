import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/Productos';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlendpoint: string = 'http://localhost:8070/api/productos';


  constructor(private http: HttpClient) { }


  getListProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.urlendpoint);
  }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlendpoint+"/categorias");
  }

  create(producto: Productos): Observable<Productos> {
    return this.http.post<Productos> (this.urlendpoint, producto, {headers: this.httpHeaders});
  }

  getProducto(id): Observable<Productos>{
    return this.http.get<Productos>(`${this.urlendpoint}/${id}`)
  } 

  updateProducto(producto: Productos): Observable<Productos>{
    return this.http.put<Productos>(`${this.urlendpoint}/${producto.id}`, producto, {headers: this.httpHeaders});
  }

  deleteProducto(id: number): Observable<Productos>{
    return this.http.delete<Productos>(`${this.urlendpoint}/${id}`, {headers: this.httpHeaders})
  }

}
