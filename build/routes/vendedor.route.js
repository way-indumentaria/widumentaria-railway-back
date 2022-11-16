"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendedor_controllers_1 = require("../controllers/vendedor.controllers");
const verificarToken_1 = require("../libs/verificarToken");
const multer_1 = __importDefault(require("../libs/multer"));
let VendedorController = new vendedor_controllers_1.vendedorController();
const enrutadorVendedor = express_1.Router();
enrutadorVendedor.route('/vendedores').get(verificarToken_1.validarToken, VendedorController.listaVendedores);
enrutadorVendedor.route('/vendedores').post(multer_1.default.array('img-vendedor'), VendedorController.guardarVendedor);
enrutadorVendedor.route('/vendedores').post(VendedorController.guardarVendedor);
enrutadorVendedor.route('/vendedores/:codigo').delete(VendedorController.eliminarVendedor);
enrutadorVendedor.route('/vendedores/:codigo').put(VendedorController.actualizarVendedor);
enrutadorVendedor.route('/vendedores-img/:codigo').put(multer_1.default.array('img-vendedor'), VendedorController.actualizar_imagen);
enrutadorVendedor.route('/vendedores/:codigo').get(VendedorController.obtenerUnVendedor);
exports.default = enrutadorVendedor;
