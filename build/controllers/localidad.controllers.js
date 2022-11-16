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
exports.localidadController = void 0;
const database_1 = require("../routes/database");
class localidadController {
    listaLocalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let localidades = yield db.query('select l.id_localidad,l.descripcion, p.descripcion as descripcion_provincia, p.id_provincia as provincia from localidad l, provincia p where l.provincia = p.id_provincia');
                res.json(localidades);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    guardarLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let localidad = req.body;
                yield db.query('insert into localidad set ?', [localidad]);
                res.json('La localidad fue guardada exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    eliminarLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from localidad where id_localidad = ?", [codigo]);
                res.json('La localidad se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json("No se puede eliminar una localidad que este siendo utilizada por una venta");
            }
        });
    }
    actualizarLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let localidad_actualizada = req.body;
                yield db.query("update localidad set ? where id_localidad = ?", [localidad_actualizada, codigo]);
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    obtenerUnaLocalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unaLocalidad = yield db.query("select * from localidad where id_localidad = ?", [codigo]);
                res.json(unaLocalidad[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.localidadController = localidadController;
