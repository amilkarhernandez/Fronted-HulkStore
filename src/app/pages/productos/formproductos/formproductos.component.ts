import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { Productos } from 'src/app/models/Productos';
import { Categoria } from 'src/app/models/Categoria';


@Component({
  selector: 'app-formproductos',
  templateUrl: './formproductos.component.html',
  styleUrls: ['./formproductos.component.css']
})
export class FormproductosComponent implements OnInit {


  productos: Productos = new Productos;
  categoria: Categoria[];

  constructor(private productosService: ProductoService,
    private router: Router, 
    private activateRouter: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarProducto();
      this.cargarCategorias();
    }
  
    cargarProducto(): void {
      this.activateRouter.params.subscribe(
        params => { 
          let id = params['id']
          if(id){
            this.productosService.getProducto(id).subscribe(
              (producto) => this.productos = producto
            )
          }
      }
      )
    }
  
    create(): void {
      this.productosService.create(this.productos).subscribe(
        clientes => {
          this.router.navigate(['/productos'])
          swal('Nuevo Producto', 'Producto creado con Exito', 'success')
      }
      )
      console.log(this.productos);
    }
  
    update(): void {
      this.productosService.updateProducto(this.productos).subscribe(
        cliente => {
          this.router.navigate(['/productos'])
          swal('Producto Actualizado', 'Producto Actualizado con Exito', 'success')
        }
      )
    }

    cargarCategorias(): void {
      this.productosService.getCategorias().subscribe(
        categoria => this.categoria = categoria
     );
    }
  
    compararCategoria(o1: Categoria, o2: Categoria){
      return o1==null || o2==null? false: o1.id==o2.id;
    }

}
