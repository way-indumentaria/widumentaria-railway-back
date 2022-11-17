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
exports.CatgastoController = void 0;
const database_1 = require("../routes/database");
// CRUD
class CatgastoController {
    //listar
    listaCatgasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let categoria_gasto = yield db.query('select * from categoria_gasto');
                res.json(categoria_gasto[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //guardar
    guardarCatgasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let catg = req.body;
                yield db.query("insert into categoria_gasto set ?", [catg]);
                res.json("La categoria se inserto exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //eliminar
    eliminarCatgasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conex = yield database_1.conexion();
            let id_categoria_gasto = req.params.id;
            try {
                yield conex.query('delete from categoria_gasto where id_categoria_gasto = ?', [id_categoria_gasto]);
                res.json("Categoria de gasto eliminada");
                yield conex.end();
            }
            catch (error) {
                return res.json("No se puede eliminar una categoria de gasto que este siendo utilizada por un gasto");
            }
            //const db = await conexion();
            //let id = req.params.id;
            //await db.query("delete from categoria_gasto where id_categoria_gasto = ?", [id]);
            //return res.json('La categoria se elimino correctamente');
        });
    }
    //actualizar
    actualizarCatgasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let id = req.params.id;
                let nuevos_datos_catg = req.body;
                yield db.query("update categoria_gasto set ? where id_categoria_gasto = ?", [nuevos_datos_catg, id]);
                res.json('se actualizo correctamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //obtener un solo objeto de la tabla
    obtenerUnaCatgasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let id = req.params.id;
                let unaCatg = yield db.query("select * from categoria_gasto where id_categoria_gasto = ? ", [id]);
                res.json(unaCatg[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.CatgastoController = CatgastoController;
