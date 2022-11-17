import { Router } from "express";
import { categoriaController } from "../controllers/categoria.controllers";
import { validarToken } from "../libs/verificarToken";


let CategoriaController = new categoriaController();

const enrutadorCategoria = Router();

enrutadorCategoria.route('/categoria').get(CategoriaController.listaCategoria);

enrutadorCategoria.route('/categoria').post(CategoriaController.guardarCategoria);

enrutadorCategoria.route('/categoria/:codigo').delete(CategoriaController.eliminarCategoria);

enrutadorCategoria.route('/categoria/:codigo').put(CategoriaController.actualizarCategoria);

enrutadorCategoria.route('/categoria/:codigo').get(CategoriaController.obtenerUnaCategoria);

export default enrutadorCategoria;