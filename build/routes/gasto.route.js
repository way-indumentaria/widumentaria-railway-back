"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos la funcion "Router" desde "express"
const express_1 = require("express");
//Importamos el metodo "consolassController" desde el archivo "consolas.controllers"
const gasto_controllers_1 = require("../controllers/gasto.controllers");
//Instancia que permite tener todas las funciones de la clase "consolasController"
let GastoController = new gasto_controllers_1.gastoController();
//Creamos una variable constante llamada "enrutadorConsolas", en la que se guardara todas las funciones de Router
const enrutadorGasto = express_1.Router();
//Creamos una ruta que realiza una peticion que listara las consolas
enrutadorGasto.route('/gastos').get(GastoController.listaGastos);
//Ruta que permite guardar datos en la base
enrutadorGasto.route('/gastos').post(GastoController.guardarGasto);
//Ruta que permite eliminar datos de la base
enrutadorGasto.route('/gastos/:codigo').delete(GastoController.eliminarGasto);
//Ruta que permite actualzar datos de la base
enrutadorGasto.route('/gastos/:codigo').put(GastoController.actualizarGasto);
//Ruta que permite obtener una consola en especifico de la base de datos
enrutadorGasto.route('/gastos/:codigo').get(GastoController.obtenerUnGasto);
//Exportamos
exports.default = enrutadorGasto;
