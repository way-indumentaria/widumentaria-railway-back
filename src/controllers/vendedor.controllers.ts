import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { IVendedor } from "../models/vendedor";

import fs from "fs-extra";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name:'way-indumentaria',
    api_key:'787786494428445',
    api_secret:'oAG-TJsJY-5MhqlwqIRGOXlTGpw'
});


export class vendedorController{

    public async listaVendedores(req:Request,res:Response){

        try {
            const db = await conexion();

            let vendedores = await db.query('select v.id_vendedor, v.nombre, v.apellido, v.dni, v.domicilio, v.email, l.descripcion as descripcion, l.id_localidad as id_localidad , v.adjunto, v.telefono, v.nom_garante, v.ape_garante, v.email_garante, v.dni_garante, v.domicilio_garante, v.telefono_garante, v.estado, v.imagen_perfil from vendedor v,localidad l where v.localidad = l.id_localidad order by v.nombre asc');

            res.json(vendedores);
            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    public async guardarVendedor(req:Request,res:Response){

        try {
            const db = await conexion();

            let vendedor:IVendedor = req.body;
            console.log(vendedor)
            const files:any = req.files;


            const vendedor_formateado:IVendedor = {
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                dni:Number(req.body.dni),
                email:req.body.nombre,
                localidad:Number(req.body.localidad),
                telefono:req.body.telefono,
                domicilio:req.body.domicilio,
                adjunto:req.body.adjunto,
                nom_garante:req.body.nom_garante,
                ape_garante:req.body.ape_garante,
                dni_garante:Number(req.body.dni_garante),
                email_garante:req.body.email_garante,
                domicilio_garante:req.body.domicilio_garante,
                telefono_garante:req.body.telefono_garante,
                estado:Number(req.body.estado)
            }

            if(files[0]){
                const resultado_cloudinary = await cloudinary.v2.uploader.upload(files[0].path);

                vendedor_formateado.imagen_perfil = resultado_cloudinary.secure_url;
                vendedor_formateado.public_id = resultado_cloudinary.public_id;
            }

            await db.query('insert into vendedor set ?',[vendedor_formateado]);

            if(files[0]){
                await fs.unlink(files[0].path); 
            }

            res.json('El vendedor fue guardado exitosamente'); 
            await db.end();
        } catch (error) {
            return res.json(error);
        }
    
    }

    public async actualizar_imagen(req:Request,res:Response)
    {
        try {
            const files:any = req.files;
            console.log(files[0].path)
            if(req.files){
                const db = await conexion();
    
                const files:any = req.files;
                let codigo = req.params.codigo;
    
                const resultado_cloudinary = await cloudinary.v2.uploader.upload(files[0].path);
    
                const imagen_perfil = resultado_cloudinary.secure_url;
                const public_id = resultado_cloudinary.public_id;

                const vendedor_imagen_perfil_actualizada = {
                    imagen_perfil:imagen_perfil,
                    public_id:public_id
                }
    
                await db.query("update vendedor set ? where id_vendedor = ?",[vendedor_imagen_perfil_actualizada,codigo])
    
                await fs.unlink(files[0].path); 

                res.json(imagen_perfil);
            }
        } catch (error) {
            return res.json(error);
        }
        
    }

    public async eliminarVendedor(req:Request,res:Response)
    {

        try {
            const db = await conexion();

            let codigo = req.params.codigo;
            await db.query("delete from vendedor where id_vendedor = ?",[codigo]);
            res.json('El vendedor se elimino exitosamente');
            await db.end();
        }
        
        catch (error) {
            return res.json("No se puede eliminar un vendedor que este siendo utilizado por una venta")
        }

    }

    public async actualizarVendedor(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            //let vendedor_actualizado = req.body;

            let va = {
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                dni:Number(req.body.dni),
                email:req.body.nombre,
                localidad:Number(req.body.localidad),
                telefono:req.body.telefono,
                domicilio:req.body.domicilio,
                adjunto:req.body.adjunto,
                nom_garante:req.body.nom_garante,
                ape_garante:req.body.ape_garante,
                dni_garante:Number(req.body.dni_garante),
                email_garante:req.body.email_garante,
                domicilio_garante:req.body.domicilio_garante,
                telefono_garante:req.body.telefono_garante,
                estado:Number(req.body.estado)
            }

            await db.query("update vendedor set ? where id_vendedor = ?",[va,codigo]);

            res.json("Se actualizo exitosamente");
            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    public async obtenerUnVendedor(req:Request,res:Response)
    {

        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            let unVendedor = await db.query("select * from vendedor where id_vendedor = ?",[codigo]);

            res.json(unVendedor[0]);
            await db.end();

        } catch (error) {
            return res.json(error);
        }
    }

}

