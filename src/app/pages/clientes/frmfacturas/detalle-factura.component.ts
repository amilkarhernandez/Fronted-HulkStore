import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/models/Factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;

  constructor(private facturaService: FacturasService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      paramns => {
        let id = +paramns.get('id');
        this.facturaService.getFactura(id).subscribe(
          factura => {
            this.factura = factura;
          }
        )
      }
    )
  }

}
