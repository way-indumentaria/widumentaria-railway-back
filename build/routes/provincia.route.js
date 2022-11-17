"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provincia_controllers_1 = require("../controllers/provincia.controllers");
let ProvinciaController = new provincia_controllers_1.provinciaController();
const enrutadorProvincia = express_1.Router();
enrutadorProvincia.route('/provincias').get(ProvinciaController.listaProvincias);
enrutadorProvincia.route('/provincias').post(ProvinciaController.guardarProvincias);
enrutadorProvincia.route('/provincias/:codigo').delete(ProvinciaController.eliminarProvincia);
enrutadorProvincia.route('/provincias/:codigo').put(ProvinciaController.actualizarProvincia);
enrutadorProvincia.route('/provincias/:codigo').get(ProvinciaController.obtenerUnaProvincia);
exports.default = enrutadorProvincia;
