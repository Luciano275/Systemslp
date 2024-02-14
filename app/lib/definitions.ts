import { UUID } from "crypto"

export type ParamsType = {
  params: {
    id: string;
  }
}

export enum Sectores {
  'Lácteos',
  'Bebidas',
  'Limpiezas',
  'Golosinas',
  'Comestibles'
}

export type Product = {
  id: UUID;
  nombre: string;
  descripcion: string;
  vencimiento: Date;
  stock: number;
  precio: number;
  sector: Sectores
}

export type Proveedor = {
  id: UUID;
  nombre: string;
  producto: string;
  descripcion: string;
  cantidad: number;
  entrega: Date;
  precio: number;
}

export type Loss = {
  id: UUID;
  producto_id: UUID;
  cantidad: number;
  mes: number
}

export type TotalLoss = {
  revenue: {
    total_perdido: number
  };
  product: {
    cantidad_total_perdida: number
  };
  chartProduct: {
    cantidad_total_perdida: number;
    mes: string;
    mes_id: number;
  };
  chartSector: {
    cantidad_total_perdida: number;
    sector: string;
    mes: string;
    mes_id: number;
  }
}