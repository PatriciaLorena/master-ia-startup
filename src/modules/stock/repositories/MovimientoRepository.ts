import { MovimientoStock } from "../models/MovimientoStock";
import { TipoMovimiento } from "../types/stock.types";

export class MovimientoRepository {
  async crear(
    movimiento: Omit<MovimientoStock, "id">,
  ): Promise<MovimientoStock> {
    // TODO: conectar con MongoDB en Clase 16
    throw new Error("No implementado aun");
  }

  async obtenerPorVariante(varianteId: string): Promise<MovimientoStock[]> {
    // TODO: conectar con MongoDB en Clase 16
    throw new Error("No implementado aun");
  }

  async calcularStock(varianteId: string): Promise<number> {
    const movimientos = await this.obtenerPorVariante(varianteId);

    return movimientos.reduce((total, mov) => {
      if (mov.tipo === "entrada" || mov.tipo === "devolucion") {
        return total + mov.cantidad;
      }
      return total - mov.cantidad;
    }, 0);
  }

  async obtenerHistorial(filtros: {
    productoId?: string;
    varianteId?: string;
    tipo?: TipoMovimiento;
    desde?: Date;
    hasta?: Date;
  }): Promise<MovimientoStock[]> {
    // TODO: conectar con MongoDB en Clase 16
    throw new Error("No implementado aun");
  }
}
