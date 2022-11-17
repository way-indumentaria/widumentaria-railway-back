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
exports.EstadisticasController = void 0;
const obtenerSeries_1 = require("../libs/obtenerSeries");
class EstadisticasController {
    impagasPagasGastos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                console.log(fdesde + ' - - ' + fhasta);
                res.json(yield obtenerSeries_1.obtenerImapagasPagasGastosTotales(fdesde, fhasta));
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    cantidadVentasPorVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                console.log(fdesde + ' - - ' + fhasta);
                res.json(yield obtenerSeries_1.obtenerSerieCantidadVentas(fdesde, fhasta));
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    ventasPorVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                console.log(fdesde + ' - - ' + fhasta);
                const vpv = yield obtenerSeries_1.obtenerSerie(fdesde, fhasta);
                res.json(vpv[0]);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    ventasTotalesPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                res.json((yield obtenerSeries_1.obtenerVentasTotales(fdesde, fhasta))[0]);
            }
            catch (error) {
                console.log(error);
                return res.json(error);
            }
        });
    }
    ventasPorProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                res.json(yield obtenerSeries_1.obtenerVentasProducto(fdesde, fhasta));
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    ventasImpagasPagas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fdesde = req.params.fdesde;
                const fhasta = req.params.fhasta;
                res.json(yield obtenerSeries_1.obtenerVentasImpagasPagas(fdesde, fhasta));
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.EstadisticasController = EstadisticasController;
