//Importamos la funcion "Router" desde express, esto nos permitira crear un enrutador que generara las rutas
import { Router } from "express";

//Importamos la funcion "mensaje_bienvenida" desde el archivo "index.controllers"
import { mensaje_bienvenida } from "../controllers/index.controllers";

//Creamos una variable llamada "enrutadorIndex", en la que se guardara todas las funciones de Router
let enrutadorIndex = Router();

//Creamos una ruta que realiza una peticion a la funcion "mensaje_bienvenida" que le dara como respuesta un mensaje
enrutadorIndex.route('/').get(mensaje_bienvenida);

//Exportamos el enrutadorIndex
export default enrutadorIndex;