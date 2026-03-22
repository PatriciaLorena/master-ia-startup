import { MovimientoStock } from "../models/MovimientoStock";
import { MovimientoRepository } from "../repositories/MovimientoRepository";

export class StockService {
  private movimientoRepo: MovimientoRepository;

  constructor() {
    this.movimientoRepo = new MovimientoRepository();
  }

  async entradaMercaderia(datos: {
    productoId: string;
    varianteId: string;
    sku: string;
    cantidad: number;
    motivo: string;
    usuarioId: string;
  }): Promise<MovimientoStock> {
    try {
      if (!datos.productoId || datos.productoId.trim() === "") {
        throw new Error("El productoId es requerido");
      }
      if (!datos.usuarioId || datos.usuarioId.trim() === "") {
        throw new Error("El usuarioId es requerido");
      }
      if (datos.cantidad <= 0) {
        throw new Error("La cantidad debe ser mayor a cero");
      }

      // Log SKU y cantidad de la entrada
      console.log(
        `Registro entrada de mercadería - SKU: ${datos.sku}, Cantidad: ${datos.cantidad}`,
      );

      const stockActual = await this.movimientoRepo.calcularStock(
        datos.varianteId,
      );

      return await this.movimientoRepo.crear({
        ...datos,
        tipo: "entrada",
        stockAnterior: stockActual,
        stockNuevo: stockActual + datos.cantidad,
        fecha: new Date(),
      });
    } catch (error: any) {
      throw new Error(
        error?.message || "Error al registrar entrada de mercadería",
      );
    }
  }

  async descontarPorVenta(datos: {
    productoId: string;
    varianteId: string;
    sku: string;
    cantidad: number;
    ventaId: string;
    usuarioId: string;
  }): Promise<MovimientoStock> {
    if (datos.cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor a cero");
    }

    const stockActual = await this.movimientoRepo.calcularStock(
      datos.varianteId,
    );

    if (stockActual < datos.cantidad) {
      throw new Error(
        `Stock insuficiente para SKU ${datos.sku}. ` +
          `Disponible: ${stockActual}, solicitado: ${datos.cantidad}`,
      );
    }

    return this.movimientoRepo.crear({
      productoId: datos.productoId,
      varianteId: datos.varianteId,
      sku: datos.sku,
      tipo: "venta",
      cantidad: datos.cantidad,
      stockAnterior: stockActual,
      stockNuevo: stockActual - datos.cantidad,
      motivo: `Venta #${datos.ventaId}`,
      referenciaId: datos.ventaId,
      usuarioId: datos.usuarioId,
      fecha: new Date(),
    });
  }

  async consultarStock(varianteId: string): Promise<number> {
    return this.movimientoRepo.calcularStock(varianteId);
  }
}
