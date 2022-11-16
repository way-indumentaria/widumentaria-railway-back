"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const database_1 = require("../routes/database");
class productoController {
    listaProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let producto = yield db.query('select DATE_FORMAT(p.fecha_carga,"%d/%m/%Y") as fecha_carga, DATE_FORMAT(p.fecha_carga,"%d/%m/%Y") as fecha_carga_formateada, DATE_FORMAT(p.fecha_carga, "%d") as day, DATE_FORMAT(p.fecha_carga, "%m") as month, DATE_FORMAT(p.fecha_carga, "%Y") as year, p.id_producto, p.codigo, p.descripcion, p.precio_compra, p.precio_way, p.precio_final, c.descripcion as descripcion_categoria, p.estado, p.descuento, p.categoria_sexo, p.fecha_carga, p.categoria as categoria, p.stock from producto p, categoria c where p.categoria = c.id_categoria');
                res.json(producto);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    guardarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let producto = req.body;
                yield db.query('insert into producto set ?', [producto]);
                res.json('El producto fue guardada exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    eliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from producto where id_producto = ?", [codigo]);
                res.json('El producto se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    actualizarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let producto_actualizado = req.body;
                yield db.query("update producto set ? where id_producto = ?", [producto_actualizado, codigo]);
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    obtenerUnProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unProducto = yield db.query("select * from producto where id_producto = ?", [codigo]);
                res.json(unProducto[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.productoController = productoController;
