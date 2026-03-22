import {
  CategoriaPrincipal,
  EstadoProducto,
  Subcategoria,
} from "../types/stock.types";
export interface Variante {
  id: string;
  sku: string; // codigo unico: 'NIKE-AIR-40-NEG'
  talla: string; // '36', '37', '38'... o 'S', 'M', 'L'
  color: string; // 'negro', 'blanco', 'rojo'
  stockActual: number; // calculado sumando movimientos
  stockMinimo: number; // alerta cuando baje de aqui
  precio: number;
  activo: boolean;
}

export interface Producto {
  id: string;
  nombre: string; // 'Nike Air Max 270'
  marca: string; // 'Nike'
  modelo: string; // 'Air Max 270'
  categoria: CategoriaPrincipal; // 'deportes' | 'ninos' | 'adultos'
  subcategoria: Subcategoria; // 'damas' | 'caballeros' | 'unisex'
  variantes: Variante[];
  estado: EstadoProducto;
  creadoEn: Date;
  updatedAt: Date;
}
