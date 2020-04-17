import { ItemFactura } from './ItemFactura';
import { Clientes } from './Clientes';

export class Factura{
    id: number;
    items: Array<ItemFactura> = [];
    cliente: Clientes;
    total: number;
    fecha: String;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemFactura) => {
          this.total += item.calcularImporte();
        });
        return this.total;
      }
}