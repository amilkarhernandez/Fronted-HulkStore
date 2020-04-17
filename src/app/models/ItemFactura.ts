import { Productos } from './Productos';

export class ItemFactura{
    
    producto: Productos;
    cantidad: number = 1;
    importe: number;
    
    public calcularImporte(): number {
        return this.cantidad*this.producto.valorUnitario;
    }
}