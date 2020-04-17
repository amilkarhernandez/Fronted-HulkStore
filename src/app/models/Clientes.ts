import { Factura } from './Factura';

export class Clientes{
    id: number;
    nit: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    genero: string;
    facturas: Array<Factura> = [];
}