import { Component, OnInit, Input } from '@angular/core';
import { Clientes } from 'src/app/models/Clientes';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/models/Factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-frmfacturas',
  templateUrl: './frmfacturas.component.html',
  styleUrls: ['./frmfacturas.component.css']
})
export class FrmfacturasComponent implements OnInit {

  @Input() 
  clienteModal: Clientes;

  constructor(private facturaService: FacturasService) { }

  ngOnInit(){
   console.log(this.clienteModal.id);
  }

  deleteFactura(factura: Factura): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar esta Factura?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.facturaService.delete(factura.id).subscribe(
          reponse => {
            this.clienteModal.facturas = this.clienteModal.facturas.filter(f=> f !== factura)
            swal(
              'Borrado!',
              'La Factura se ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }



}
