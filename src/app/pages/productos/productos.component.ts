import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/Productos';
import { ProductoService } from 'src/app/services/producto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Productos[];

  constructor(private productosService: ProductoService) { }

  ngOnInit() {
    this.productosService.getListProductos().subscribe(
       productos => this.productos = productos
    );
  }

  delete(producto: Productos): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar este Producto?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.productosService.deleteProducto(producto.id).subscribe(
          reponse => {
            this.productos = this.productos.filter(user=> user !== producto)
            swal(
              'Borrado!',
              'El Producto ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }

}
