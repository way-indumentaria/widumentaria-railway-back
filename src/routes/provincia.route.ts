import { Router } from "express";
import { provinciaController } from "../controllers/provincia.controllers";
import { validarToken } from "../libs/verificarToken";

let ProvinciaController = new provinciaController();

const enrutadorProvincia = Router();

enrutadorProvincia.route('/provincias').get(ProvinciaController.listaProvincias);

enrutadorProvincia.route('/provincias').post(ProvinciaController.guardarProvincias);

enrutadorProvincia.route('/provincias/:codigo').delete(ProvinciaController.eliminarProvincia);

enrutadorProvincia.route('/provincias/:codigo').put(ProvinciaController.actualizarProvincia);

enrutadorProvincia.route('/provincias/:codigo').get(ProvinciaController.obtenerUnaProvincia);

export default enrutadorProvincia;