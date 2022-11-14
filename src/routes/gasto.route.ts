//Importamos la funcion "Router" desde "express"
import { Router } from "express";

//Importamos el metodo "consolassController" desde el archivo "consolas.controllers"
import { gastoController } from "../controllers/gasto.controllers";

import { validarToken } from "../libs/verificarToken";

//Instancia que permite tener todas las funciones de la clase "consolasController"
let GastoController = new gastoController();

//Creamos una variable constante llamada "enrutadorConsolas", en la que se guardara todas las funciones de Router
const enrutadorGasto = Router();

//Creamos una ruta que realiza una peticion que listara las consolas
enrutadorGasto.route('/gastos').get(validarToken,GastoController.listaGastos);

//Ruta que permite guardar datos en la base
enrutadorGasto.route('/gastos').post(GastoController.guardarGasto);

//Ruta que permite eliminar datos de la base
enrutadorGasto.route('/gastos/:codigo').delete(GastoController.eliminarGasto);

//Ruta que permite actualzar datos de la base
enrutadorGasto.route('/gastos/:codigo').put(GastoController.actualizarGasto);

//Ruta que permite obtener una consola en especifico de la base de datos
enrutadorGasto.route('/gastos/:codigo').get(GastoController.obtenerUnGasto);

//Exportamos
export default enrutadorGasto;