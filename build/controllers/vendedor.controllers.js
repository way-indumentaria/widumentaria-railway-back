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
exports.vendedorController = void 0;
const database_1 = require("../routes/database");
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: 'way-indumentaria',
    api_key: '787786494428445',
    api_secret: 'oAG-TJsJY-5MhqlwqIRGOXlTGpw'
});
class vendedorController {
    listaVendedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let vendedores = yield db.query('select v.id_vendedor, v.nombre, v.apellido, v.dni, v.domicilio, v.email, l.descripcion as descripcion, l.id_localidad as id_localidad , v.adjunto, v.telefono, v.nom_garante, v.ape_garante, v.email_garante, v.dni_garante, v.domicilio_garante, v.telefono_garante, v.estado, v.imagen_perfil from vendedor v,localidad l where v.localidad = l.id_localidad order by v.nombre asc');
                res.json(vendedores);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    guardarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let vendedor = req.body;
                console.log(vendedor);
                const files = req.files;
                const vendedor_formateado = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: Number(req.body.dni),
                    email: req.body.nombre,
                    localidad: Number(req.body.localidad),
                    telefono: req.body.telefono,
                    domicilio: req.body.domicilio,
                    adjunto: req.body.adjunto,
                    nom_garante: req.body.nom_garante,
                    ape_garante: req.body.ape_garante,
                    dni_garante: Number(req.body.dni_garante),
                    email_garante: req.body.email_garante,
                    domicilio_garante: req.body.domicilio_garante,
                    telefono_garante: req.body.telefono_garante,
                    estado: Number(req.body.estado)
                };
                if (files[0]) {
                    const resultado_cloudinary = yield cloudinary_1.default.v2.uploader.upload(files[0].path);
                    vendedor_formateado.imagen_perfil = resultado_cloudinary.secure_url;
                    vendedor_formateado.public_id = resultado_cloudinary.public_id;
                }
                yield db.query('insert into vendedor set ?', [vendedor_formateado]);
                if (files[0]) {
                    yield fs_extra_1.default.unlink(files[0].path);
                }
                res.json('El vendedor fue guardado exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    actualizar_imagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                console.log(files[0].path);
                if (req.files) {
                    const db = yield database_1.conexion();
                    const files = req.files;
                    let codigo = req.params.codigo;
                    const resultado_cloudinary = yield cloudinary_1.default.v2.uploader.upload(files[0].path);
                    const imagen_perfil = resultado_cloudinary.secure_url;
                    const public_id = resultado_cloudinary.public_id;
                    const vendedor_imagen_perfil_actualizada = {
                        imagen_perfil: imagen_perfil,
                        public_id: public_id
                    };
                    yield db.query("update vendedor set ? where id_vendedor = ?", [vendedor_imagen_perfil_actualizada, codigo]);
                    yield fs_extra_1.default.unlink(files[0].path);
                    res.json(imagen_perfil);
                }
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    eliminarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                yield db.query("delete from vendedor where id_vendedor = ?", [codigo]);
                res.json('El vendedor se elimino exitosamente');
                yield db.end();
            }
            catch (error) {
                return res.json("No se puede eliminar un vendedor que este siendo utilizado por una venta");
            }
        });
    }
    actualizarVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                //let vendedor_actualizado = req.body;
                let va = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: Number(req.body.dni),
                    email: req.body.nombre,
                    localidad: Number(req.body.localidad),
                    telefono: req.body.telefono,
                    domicilio: req.body.domicilio,
                    adjunto: req.body.adjunto,
                    nom_garante: req.body.nom_garante,
                    ape_garante: req.body.ape_garante,
                    dni_garante: Number(req.body.dni_garante),
                    email_garante: req.body.email_garante,
                    domicilio_garante: req.body.domicilio_garante,
                    telefono_garante: req.body.telefono_garante,
                    estado: Number(req.body.estado)
                };
                yield db.query("update vendedor set ? where id_vendedor = ?", [va, codigo]);
                res.json("Se actualizo exitosamente");
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    obtenerUnVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let codigo = req.params.codigo;
                let unVendedor = yield db.query("select * from vendedor where id_vendedor = ?", [codigo]);
                res.json(unVendedor[0]);
                yield db.end();
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.vendedorController = vendedorController;
