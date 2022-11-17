import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { IProducto } from '../models/producto';


export class productoController {
    
    public async listaProducto(req:Request,res:Response){

        try {
            const db = await conexion();

            let producto = await db.query('select DATE_FORMAT(p.fecha_carga,"%d/%m/%Y") as fecha_carga, DATE_FORMAT(p.fecha_carga,"%d/%m/%Y") as fecha_carga_formateada, DATE_FORMAT(p.fecha_carga, "%d") as day, DATE_FORMAT(p.fecha_carga, "%m") as month, DATE_FORMAT(p.fecha_carga, "%Y") as year, p.id_producto, p.codigo, p.descripcion, p.precio_compra, p.precio_way, p.precio_final, c.descripcion as descripcion_categoria, p.estado, p.descuento, p.categoria_sexo, p.fecha_carga, p.categoria as categoria, p.stock from producto p, categoria c where p.categoria = c.id_categoria');
    
            res.json(producto[0]);

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }


    public async guardarProducto(req:Request,res:Response){

        try {
            const db = await conexion();

            let producto:IProducto = req.body;

            await db.query('insert into producto set ?',[producto]);

            res.json('El producto fue guardada exitosamente'); 

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    
    public async eliminarProducto(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            await db.query("delete from producto where id_producto = ?",[codigo]);

            res.json('El producto se elimino exitosamente');

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    
    public async actualizarProducto(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;
    
            let producto_actualizado = req.body;
    
            await db.query("update producto set ? where id_producto = ?",[producto_actualizado,codigo]);
    
            res.json("Se actualizo exitosamente");

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    
    public async obtenerUnProducto(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            let unProducto = await db.query("select * from producto where id_producto = ?",[codigo]);

            res.json(unProducto[0]);

            await db.end();
        } catch (error) {
            return res.json(error)
        }
    }


}