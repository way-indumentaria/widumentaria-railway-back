//Importamos la funcion "conexion" desde el archivo database
import { conexion } from "../routes/database";

//Importamos las interfaces "Response" y "Request" desde "express"
import { Request, Response } from "express";

//Importamos la interfaz "IConsola" desde el archivo "consola"
import { IGasto } from "../models/gasto";

//Clase que nos permitira almacenar metodos
export class gastoController {
    
    //Metodo que nos permite listar consolas
    public async listaGastos(req:Request,res:Response){

        try {
            //Guardamos la funcion "conexion" en las constante "db", para lograr la conexion con la base de datos
            const db = await conexion();

            //Realizamos la consulta para mostrar los datos de la tabla consolas
            let gastos = await db.query('select g.id_gasto,g.descripcion,g.importe,cg.descripcion as descripcion_categoria, cg.id_categoria_gasto as categoria from gasto g, categoria_gasto cg where g.categoria = cg.id_categoria_gasto');

            //Retorna una respuesta en formato json de pagos
            res.json(gastos[0]);
            await db.end();
        } catch (error) {
            return res.json(error);
        }
        

    }

    //Metodo que guardara datos en la base
    public async guardarGasto(req:Request,res:Response){

        try {
            //Conexion con la base de datos
            const db = await conexion();

            //Guardamos los datos ingresados en el body en una variable
            let gasto:IGasto = req.body;

            //Inserta los datos en la base de datos
            await db.query('insert into gasto set ?',[gasto]);

            //Retorna un mensaje despues de realizarse todo de forma correcta
            res.json('El gasto fue guardado exitosamente'); 

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    
    }

    //Metodo que nos permite eliminar datos
    public async eliminarGasto(req:Request,res:Response)
    {
        try {
            //Conexion con la base de datos
            const db = await conexion();

            //Recibe el codigo de la consola
            let codigo = req.params.codigo;

            //Realiza la eliminacion de la consola
            await db.query("delete from gasto where id_gasto = ?",[codigo]);

            //Retorna un mensaje despues de realizarse todo de forma correcta
            res.json('El gasto se elimino exitosamente');

            await db.end();
        } catch (error) {
            return res.json(error)
        }

    }

    //Metodo que nos permite actualizar datos
    public async actualizarGasto(req:Request,res:Response)
    {
        try {
            //Conexion con la base de datos
            const db = await conexion();

            //Recibimos el codigo de la consola
            let codigo = req.params.codigo;

            //Nuevos datos de la consola
            let gasto_actualizado = req.body;

            //Realiza la actualizacion
            await db.query("update gasto set ? where id_gasto = ?",[gasto_actualizado,codigo]);

            //Retorna un mensaje despues de realizarse todo correctamente
            res.json("Se actualizo exitosamente");

            await db.end();
        } catch (error) {
            return res.json(error);
        }
        

    }

    //Metodo que lista una consola en especifico
    public async obtenerUnGasto(req:Request,res:Response)
    {
        try {
            //Conexion con la base de datos
            const db = await conexion();

            //Recibimos el codigo de la consola
            let codigo = req.params.codigo;

            //Realiza la seleccion de una consola y la guarda en una variable
            let unGasto = await db.query("select * from gasto where id_gasto = ?",[codigo]);

            //Retorna la consola seleccionada
            res.json(unGasto[0]);   

            await db.end();
        } catch (error) {
            return res.json(error);
        }
        
    }

}