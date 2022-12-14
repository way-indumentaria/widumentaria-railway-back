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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacionController = void 0;
const database_1 = require("../routes/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AutenticacionController {
    registrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const password_cifrada = yield bcryptjs_1.default.hash(req.body.password, salt);
                const unUsuario = {
                    username: req.body.username,
                    password: password_cifrada,
                    email: req.body.email
                };
                const db = yield database_1.conexion();
                const resultado = yield db.query('insert into usuario set ?', [unUsuario]);
                const token = jsonwebtoken_1.default.sign({ _id: resultado.insertId }, process.env.TOKEN || '1234');
                res.json(token);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                const [usuario] = yield db.query('select * from usuario where username = ?', [req.body.username]);
                if (!usuario[0]) {
                    res.json(1);
                }
                else {
                    const correctPassword = yield bcryptjs_1.default.compare(req.body.password, usuario[0].password);
                    if (!correctPassword) {
                        res.json(0);
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ _id: usuario[0].id_usuario }, process.env.TOKEN || '1234');
                        res.json(token);
                    }
                }
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.AutenticacionController = AutenticacionController;
