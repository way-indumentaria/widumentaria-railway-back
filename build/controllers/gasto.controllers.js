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
exports.gastoController = void 0;
//Importamos la funcion "conexion" desde el archivo database
const database_1 = require("../routes/database");
//Clase que nos permitira almacenar metodos
class gastoController {
    //Metodo que nos permite listar consolas
    listaGastos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Guardamos la funcion "conexion" en las constante "db", para lograr la conexion con la base de datos
                const db = yield database_1.conexion();
                //Realizamos la consulta para mostrar los datos de la tabla consolas
                let [gastos] = yield db.query('select g.id_gasto,g.descripcion,g.importe,cg.descripcion as descripcion_categoria, cg.id_categoria_gasto as categoria from gasto g, categoria_gasto cg where g.categoria = cg.id_categoria_gasto');
                //Retorna una respuesta en formato json de pagos
                res.json(gastos);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //Metodo que guardara datos en la base
    guardarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Conexion con la base de datos
                const db = yield database_1.conexion();
                //Guardamos los datos ingresados en el body en una variable
                let gasto = req.body;
                //Inserta los datos en la base de datos
                yield db.query('insert into gasto set ?', [gasto]);
                //Retorna un mensaje despues de realizarse todo de forma correcta
                res.json('El gasto fue guardado exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //Metodo que nos permite eliminar datos
    eliminarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Conexion con la base de datos
                const db = yield database_1.conexion();
                //Recibe el codigo de la consola
                let codigo = req.params.codigo;
                //Realiza la eliminacion de la consola
                yield db.query("delete from gasto where id_gasto = ?", [codigo]);
                //Retorna un mensaje despues de realizarse todo de forma correcta
                res.json('El gasto se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //Metodo que nos permite actualizar datos
    actualizarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Conexion con la base de datos
                const db = yield database_1.conexion();
                //Recibimos el codigo de la consola
                let codigo = req.params.codigo;
                //Nuevos datos de la consola
                let gasto_actualizado = req.body;
                //Realiza la actualizacion
                yield db.query("update gasto set ? where id_gasto = ?", [gasto_actualizado, codigo]);
                //Retorna un mensaje despues de realizarse todo correctamente
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    //Metodo que lista una consola en especifico
    obtenerUnGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Conexion con la base de datos
                const db = yield database_1.conexion();
                //Recibimos el codigo de la consola
                let codigo = req.params.codigo;
                //Realiza la seleccion de una consola y la guarda en una variable
                let [unGasto] = yield db.query("select * from gasto where id_gasto = ?", [codigo]);
                //Retorna la consola seleccionada
                res.json(unGasto[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.gastoController = gastoController;
