import { Router } from "express";
import { localidadController } from "../controllers/localidad.controllers";
import { validarToken } from "../libs/verificarToken";

let LocalidadController = new localidadController();

const enrutadorLocalidad = Router();

enrutadorLocalidad.route('/localidades').get(LocalidadController.listaLocalidades);
enrutadorLocalidad.route('/localidades').post(LocalidadController.guardarLocalidad);
enrutadorLocalidad.route('/localidades/:codigo').delete(LocalidadController.eliminarLocalidad);
enrutadorLocalidad.route('/localidades/:codigo').put(LocalidadController.actualizarLocalidad);
enrutadorLocalidad.route('/localidades/:codigo').get(LocalidadController.obtenerUnaLocalidad);

export default enrutadorLocalidad;