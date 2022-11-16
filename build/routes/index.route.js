"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos la funcion "Router" desde express, esto nos permitira crear un enrutador que generara las rutas
const express_1 = require("express");
//Importamos la funcion "mensaje_bienvenida" desde el archivo "index.controllers"
const index_controllers_1 = require("../controllers/index.controllers");
//Creamos una variable llamada "enrutadorIndex", en la que se guardara todas las funciones de Router
let enrutadorIndex = express_1.Router();
//Creamos una ruta que realiza una peticion a la funcion "mensaje_bienvenida" que le dara como respuesta un mensaje
enrutadorIndex.route('/').get(index_controllers_1.mensaje_bienvenida);
//Exportamos el enrutadorIndex
exports.default = enrutadorIndex;
