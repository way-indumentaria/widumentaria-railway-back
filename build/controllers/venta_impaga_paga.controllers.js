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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.venta_impaga_pagaController = void 0;
const database_1 = require("../routes/database");
var forEach = require('async-foreach').forEach;
class venta_impaga_pagaController {
    enviar_a_impagas_devoluciones(req, res) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let lista_ventas = req.body;
                try {
                    for (var lista_ventas_1 = __asyncValues(lista_ventas), lista_ventas_1_1; lista_ventas_1_1 = yield lista_ventas_1.next(), !lista_ventas_1_1.done;) {
                        let venta = lista_ventas_1_1.value;
                        //devolucion a stock
                        if (venta.valor_devoluciones > 0) {
                            yield db.query('update producto set stock=stock + ? where id_producto = ?', [venta.valor_devoluciones, venta.producto]);
                        }
                        const lista = yield db.query('select * from venta_impaga_paga where fecha_venta = ? and vendedor = ?', [venta.fecha_venta, venta.vendedor]);
                        //console.log(lista);
                        if (lista[0] && venta.valor_impagas > 0) {
                            const venta_detalle = yield db.query('select * from venta_detalle where producto = ? and id_venta_paga_impaga = ? and estado = 0', [venta.producto, lista[0].id_impaga_paga]);
                            if (venta_detalle[0]) {
                                let nueva_cantidad = Number(venta_detalle[0].cantidad) + Number(venta.valor_impagas);
                                let datos = {
                                    cantidad: nueva_cantidad,
                                    importe: Number(venta.precio_unitario) * nueva_cantidad,
                                    fecha_venta: venta.fecha_venta
                                };
                                yield db.query('update venta_detalle set ? where id_venta_detalle = ?', [datos, venta_detalle[0].id_venta_detalle]);
                            }
                            else {
                                let datos = {
                                    cantidad: venta.valor_impagas,
                                    importe: Number(venta.precio_unitario) * venta.valor_impagas,
                                    fecha_venta: venta.fecha_venta,
                                    id_venta_paga_impaga: lista[0].id_impaga_paga,
                                    producto: venta.producto,
                                    estado: 0
                                };
                                yield db.query('insert into venta_detalle set ?', [datos]);
                            }
                        }
                        else {
                            if (venta.valor_impagas > 0) {
                                let datos = {
                                    fecha_venta: venta.fecha_venta,
                                    fecha_carga: new Date(),
                                    vendedor: venta.vendedor,
                                    estado: 0
                                };
                                const resultado = yield db.query('insert into venta_impaga_paga set ?', [datos]);
                                console.log('cantidad: ' + venta.valor_impagas);
                                let datos1 = {
                                    cantidad: Number(venta.valor_impagas),
                                    importe: Number(venta.precio_unitario) * Number(venta.valor_impagas),
                                    fecha_venta: venta.fecha_venta,
                                    id_venta_paga_impaga: resultado.insertId,
                                    producto: venta.producto,
                                    estado: 0
                                };
                                yield db.query('insert into venta_detalle set ?', [datos1]);
                            }
                        }
                        //actualizacion de la venta retando las enviadas a impagas y devoluciones
                        let str = venta.id;
                        str = Number(str.replace('_input', ""));
                        if (venta.valor_devoluciones > 0 || venta.valor_impagas > 0) {
                            const v = yield db.query('select * from venta where id_venta = ?', [str]);
                            let diferencia = (Number(venta.valor_impagas) + Number(venta.valor_devoluciones)) - v[0].cantidad;
                            if (diferencia == 0) {
                                yield db.query('delete from venta where id_venta = ?', [str]);
                            }
                            else {
                                let cantidad_descontar = Number(venta.valor_impagas) + Number(venta.valor_devoluciones);
                                yield db.query('update venta set importe=(importe_unitario*(cantidad-?)),cantidad=cantidad-? where id_venta = ?', [cantidad_descontar, cantidad_descontar, str]);
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (lista_ventas_1_1 && !lista_ventas_1_1.done && (_a = lista_ventas_1.return)) yield _a.call(lista_ventas_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.send(req.body.impagas_devoluciones);
                yield db.end();
            }
            catch (error) {
                return 'error';
            }
        });
    }
    listaVenta_impaga_paga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let id_vendedor = req.params.id_vendedor;
                //let venta_impaga_paga = await db.query('select *,ven.id_impaga_paga,(select sum(cantidad*importe) as debe from venta_detalle where id_venta_paga_impaga = ven.id_impaga_paga and estado = 1) as pago,(select sum(cantidad*importe) as debe from venta_detalle where id_venta_paga_impaga =ven.id_impaga_paga and estado = 0) as debe, (select sum(cantidad*importe) from venta_detalle where id_venta_paga_impaga = ven.id_impaga_paga)as total,concat(v.apellido,", ", v.nombre) as vendedor_descripcion , DATE_FORMAT(ven.fecha_carga,"%d/%m/%Y") as fecha_carga, DATE_FORMAT(ven.fecha_carga, "%d") as day, DATE_FORMAT(ven.fecha_carga, "%m") as month, DATE_FORMAT(ven.fecha_carga, "%Y") as year from vendedor v, venta_impaga_paga ven where ven.vendedor=v.id_vendedor and ven.vendedor = ? group by ven.fecha_venta order by ven.fecha_venta desc',[id_vendedor]);
                let venta_impaga_paga = yield db.query('select *,ven.id_impaga_paga,(select sum(cantidad*p.precio_way) as debe from venta_detalle vd, producto p where vd.id_venta_paga_impaga = ven.id_impaga_paga and vd.producto = p.id_producto  and vd.estado = 1) as pago,(select sum(cantidad*p.precio_way) as debe from venta_detalle vd, producto p where vd.id_venta_paga_impaga =ven.id_impaga_paga and vd.producto = p.id_producto and vd.estado = 0) as debe, (select sum(cantidad*p.precio_way) from venta_detalle vd, producto p where vd.id_venta_paga_impaga = ven.id_impaga_paga and vd.producto = p.id_producto)as total,concat(v.apellido,", ", v.nombre) as vendedor_descripcion , DATE_FORMAT(ven.fecha_venta,"%d/%m/%Y") as fecha_venta, DATE_FORMAT(ven.fecha_carga,"%d/%m/%Y") as fecha_carga, DATE_FORMAT(ven.fecha_carga, "%d") as day, DATE_FORMAT(ven.fecha_carga, "%m") as month, DATE_FORMAT(ven.fecha_carga, "%Y") as year from vendedor v, venta_impaga_paga ven where ven.vendedor=v.id_vendedor and ven.vendedor = ? group by ven.fecha_venta order by ven.fecha_venta desc', [id_vendedor]);
                res.json(venta_impaga_paga);
                yield db.end();
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
    }
    guardarVenta_impaga_paga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                //se guarda datos en la base
                console.log(req.body.fecha_carga);
                const guardarVenta_impaga_paga = {
                    fecha_carga: String(req.body.fecha_carga),
                    vendedor: Number(req.body.vendedor),
                    estado: Number(req.body.estado),
                };
                yield db.query('insert into venta_impaga_paga set ?', [guardarVenta_impaga_paga]);
                res.json('La venta_impaga_paga fue guardada exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json('Error al guardar un artículo');
            }
        });
    }
    eliminarVenta_impaga_paga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from venta_impaga_paga where id_impaga_paga = ?", [codigo]);
                res.json('La venta_impaga_paga se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    actualizarVenta_impaga_paga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let venta_impaga_paga_actualizado = req.body;
                yield db.query("update venta_impaga_paga set ? where id_impaga_paga = ?", [venta_impaga_paga_actualizado, codigo]);
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    obtenerUnaVenta_impaga_paga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unaVenta_impaga_paga = yield db.query("select * from venta_impaga_paga where id_venta_impaga_paga = ?", [codigo]);
                res.json(unaVenta_impaga_paga[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.venta_impaga_pagaController = venta_impaga_pagaController;
