import { Router } from "express";

import { CatgastoController } from "../controllers/catgasto.controllers";
import { validarToken } from "../libs/verificarToken";

let catgastoController = new CatgastoController();

const enrutadorCatgasto = Router();

enrutadorCatgasto.route('/categoria_gasto').get(validarToken,catgastoController.listaCatgasto);
enrutadorCatgasto.route('/categoria_gasto').post(catgastoController.guardarCatgasto);
enrutadorCatgasto.route('/categoria_gasto/:id').delete(catgastoController.eliminarCatgasto);
enrutadorCatgasto.route('/categoria_gasto/:id').put(catgastoController.actualizarCatgasto);
enrutadorCatgasto.route('/categoria_gasto/:id').get(catgastoController.obtenerUnaCatgasto);

export default enrutadorCatgasto;

