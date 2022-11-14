import { Router } from "express";
import { ventaController } from "../controllers/venta.controllers";
import { validarToken } from "../libs/verificarToken";

let VentaController = new ventaController();

const enrutadorVenta = Router();

enrutadorVenta.route('/ventas').get(VentaController.listaVentas);
enrutadorVenta.route('/ventas-por-vendedor/:id_vendedor').get(VentaController.listaVentasPorVendedor);
enrutadorVenta.route('/ventas-lector').post(VentaController.guardarVentaPorLector);
enrutadorVenta.route('/ventas/:codigo').delete(VentaController.eliminarVenta);
enrutadorVenta.route('/ventas/:codigo').put(VentaController.actualizarVenta);
enrutadorVenta.route('/ventas/:codigo').get(VentaController.obtenerUnaVenta);
enrutadorVenta.route('/ventas-a-stock/:id').get(VentaController.enviarStock);

export default enrutadorVenta;