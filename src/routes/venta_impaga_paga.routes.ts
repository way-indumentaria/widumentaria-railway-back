import { Router } from "express";
import { venta_impaga_pagaController } from "../controllers/venta_impaga_paga.controllers";
import { validarToken } from "../libs/verificarToken";


let Venta_impaga_pagaController = new venta_impaga_pagaController();

const enrutadorVenta_impaga_paga = Router();

enrutadorVenta_impaga_paga.route('/venta_impaga_paga/:id_vendedor').get(validarToken,Venta_impaga_pagaController.listaVenta_impaga_paga);

enrutadorVenta_impaga_paga.route('/venta_impaga_paga').post(Venta_impaga_pagaController.guardarVenta_impaga_paga);

enrutadorVenta_impaga_paga.route('/venta_impaga_paga/:codigo').delete(Venta_impaga_pagaController.eliminarVenta_impaga_paga);

enrutadorVenta_impaga_paga.route('/venta_impaga_paga/:codigo').put(Venta_impaga_pagaController.actualizarVenta_impaga_paga);

enrutadorVenta_impaga_paga.route('/enviar-impagas-devoluciones').post(Venta_impaga_pagaController.enviar_a_impagas_devoluciones);
//enrutadorVenta_impaga_paga.route('/venta_impaga_paga/:codigo').get(Venta_impaga_pagaController.obtenerUnaVenta_impaga_paga);

export default enrutadorVenta_impaga_paga;