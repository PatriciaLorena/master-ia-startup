import { TipoMovimiento } from "../types/stock.types";
export interface MovimientoStock {
  id: string;
  productoId: string;
  varianteId: string; // talla + color exacto
  sku: string; // para busquedas rapidas
  tipo: TipoMovimiento;
  cantidad: number; // siempre positivo
  stockAnterior: number; // cuanto habia antes
  stockNuevo: number; // cuanto queda despues
  motivo: string; // 'Compra proveedor Enero', 'Venta #123'
  referenciaId?: string; // id de la venta o compra relacionada
  usuarioId: string; // quien realizo el movimiento
  fecha: Date;
  observacion?: string; // 'Par con defecto en suela'
}
