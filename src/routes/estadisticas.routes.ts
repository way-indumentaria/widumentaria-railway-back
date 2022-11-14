import { Router } from "express";

import { EstadisticasController } from "../controllers/estadisticas.controllers";

let estadisticasController = new EstadisticasController();

const enrutadorEstadisticas = Router();

enrutadorEstadisticas.route('/impagas-pagas-gastos/:fdesde/:fhasta').get(estadisticasController.impagasPagasGastos);
enrutadorEstadisticas.route('/ventas-cantidad-por-vendedor/:fdesde/:fhasta').get(estadisticasController.cantidadVentasPorVendedor);
enrutadorEstadisticas.route('/ventas-por-vendedor/:fdesde/:fhasta').get(estadisticasController.ventasPorVendedor);
enrutadorEstadisticas.route('/ventas-totales-fecha/:fdesde/:fhasta').get(estadisticasController.ventasTotalesPorFecha);
enrutadorEstadisticas.route('/ventas-por-producto/:fdesde/:fhasta').get(estadisticasController.ventasPorProducto)
enrutadorEstadisticas.route('/ventas-ip/:fdesde/:fhasta').get(estadisticasController.ventasImpagasPagas)

export default enrutadorEstadisticas;
