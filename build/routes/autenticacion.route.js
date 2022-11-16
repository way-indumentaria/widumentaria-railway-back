"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_controllers_1 = require("../controllers/autenticacion.controllers");
const autenticacionController = new autenticacion_controllers_1.AutenticacionController;
const enrutadorAut = express_1.Router();
enrutadorAut.route('/registro').post(autenticacionController.registrar);
enrutadorAut.route('/ingreso').post(autenticacionController.ingresar);
exports.default = enrutadorAut;
