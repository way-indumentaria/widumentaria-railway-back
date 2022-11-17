import { Router } from "express";
import { productoController } from "../controllers/producto.controllers";
import { validarToken } from "../libs/verificarToken";


let ProductoController = new productoController();

const enrutadorProducto = Router();

enrutadorProducto.route('/producto').get(ProductoController.listaProducto);

enrutadorProducto.route('/producto').post(ProductoController.guardarProducto);

enrutadorProducto.route('/producto/:codigo').delete(ProductoController.eliminarProducto);

enrutadorProducto.route('/producto/:codigo').put(ProductoController.actualizarProducto);

enrutadorProducto.route('/producto/:codigo').get(ProductoController.obtenerUnProducto);

export default enrutadorProducto;