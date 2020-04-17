import { Categoria } from './Categoria';

export class Productos{
    id: number;
    serial: string;
    descripcion: string;
    valorUnitario: number;
    stock: number;
    categoria: Categoria
}