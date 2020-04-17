import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { Clientes } from 'src/app/models/Clientes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { FacturasService } from 'src/app/services/facturas.service';
import { Productos } from 'src/app/models/Productos';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from 'src/app/models/ItemFactura';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  factura: Factura = new Factura();
  clientes: Clientes[];

  autoCompleteControl = new FormControl();
  productosFiltrados: Observable<Productos[]>;

  constructor(private clienteService: ClienteServiceService, 
    private facturaService: FacturasService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.descripcion),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Productos[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Productos): string | undefined {
    return producto ? producto.descripcion : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Productos;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  cargarClientes(): void {
    this.clienteService.getListClientes().subscribe(
      clientes => this.clientes = clientes
   );
  }

  create(facturaForm): void {
    console.log(this.factura);
    if (this.factura.items.length == 0) {
      this.autoCompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(
        response => {
         
       var obj = JSON.parse(JSON.stringify(response))

        console.log(obj.factura.id);
        swal("Factura", `Factura creada con éxito!`, 'success');
        
        this.router.navigate(['/facturas', obj.factura.id]);
      });
    }
  }

}
