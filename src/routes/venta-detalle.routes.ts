import { Router } from "express";
import { VentaDetalleController } from "../controllers/venta-detalle.controllers";
import { validarToken } from "../libs/verificarToken";


let venta_detalle = new VentaDetalleController();

const enrutadorVentaDetalle = Router();

enrutadorVentaDetalle.route('/enviar-todo-pagas/:id_vip').get(venta_detalle.enviarTodoPagas);

enrutadorVentaDetalle.route('/ventas-impagas/:id_vip/:estado').get(venta_detalle.listaImpagasPagas);
enrutadorVentaDetalle.route('/ventas-pagas/:id_vip/:estado').get(venta_detalle.listaImpagasPagas);
enrutadorVentaDetalle.route('/enviar-pagas-impagas/:id_venta_detalle/:id_producto/:estado').get(venta_detalle.enviaraPagasImpagas);
enrutadorVentaDetalle.route('/confirmar-impagas/:id').put(venta_detalle.confirmarImpagas);
enrutadorVentaDetalle.route('/enviar-stock-venta/:id_venta_detalle/:id_producto/:tipo_movimiento/:vendedor').get(venta_detalle.enviarStockVenta);
enrutadorVentaDetalle.route('/total-impagas-pagas/:vendedor').get(venta_detalle.getTotalPagasImpagas);
export default enrutadorVentaDetalle;