import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../models/Clientes';
import { Router , ActivatedRoute} from '@angular/router';
import { ClienteServiceService } from 'src/app/services/cliente-service.service';
import swal from 'sweetalert2';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Clientes[];
  clienteEnviado : Clientes;
  constructor(private clienteService: ClienteServiceService, private modalService: ModalService) { }

  ngOnInit() {
    this.clienteService.getListClientes().subscribe(
       clientes => this.clientes = clientes
    );
  }

  delete(cliente: Clientes): void{
    swal({
      title: 'Estas Seguro?',
      text: "Seguro deseas Eliminar este Cliente?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteCliente(cliente.id).subscribe(
          reponse => {
            this.clientes = this.clientes.filter(user=> user !== cliente)
            swal(
              'Borrado!',
              'El Cliente ha sido Eliminado con Exito',
              'success'
            )
          }
        )
        
      }
    })
  }

  abrirModal(cliente: Clientes){
    //console.log(cliente);
    this.clienteEnviado = cliente;
    console.log(this.clienteEnviado);
    //this.modalService.abrirModal();
  }

}
