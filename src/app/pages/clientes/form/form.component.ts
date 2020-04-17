import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/models/Clientes';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public clientes: Clientes = new Clientes;

  constructor(private clienteService: ClienteServiceService,
    private router: Router, 
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRouter.params.subscribe(
      params => { 
        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.clientes = cliente
          )
        }
    }
    )
  }

  create(): void {
    this.clienteService.create(this.clientes).subscribe(
      clientes => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', 'Cliente creado con Exito', 'success')
        
    }
    )
    console.log(this.clientes);
  }

  update(): void {
    this.clienteService.updateCliente(this.clientes).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', 'Cliente Actualizado con Exito', 'success')
      }
    )
  }

}
