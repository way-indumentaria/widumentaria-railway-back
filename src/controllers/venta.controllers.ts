import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { IVenta } from "../models/venta";
//prueba
export class ventaController{

    public async listaVentas(req:Request,res:Response){

        try {
            const db = await conexion();

            let ventas = await db.query('select concat("v_",vr.id_vendedor) as id_vendedor_busqueda,DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta,DATE_FORMAT(v.fecha_venta,"%Y-%m-%d") as fecha_venta_origin, DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta_formateada, DATE_FORMAT(v.fecha_venta, "%d") as day, DATE_FORMAT(v.fecha_venta, "%m") as month, DATE_FORMAT(v.fecha_venta, "%Y") as year, v.id_venta, p.descripcion as producto_descripcion, p.id_producto as producto, p.codigo as codigo_producto, p.precio_way as precio_costo,p.precio_final as precio_venta, v.cantidad, v.importe, v.fecha_venta, v.importe_unitario, v.estado, v.forma_pago, v.descuento_aplicado, v.vendedor as vendedor_venta, vr.nombre from venta v, producto p,vendedor vr where v.producto = p.id_producto and v.vendedor = vr.id_vendedor');
            
            res.json(ventas);

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    public async listaVentasPorVendedor(req:Request,res:Response){

        try {
            const db = await conexion();

            let id_vendedor = req.params.id_vendedor;

            //let ventas = await db.query('select DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta, DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta_formateada, DATE_FORMAT(v.fecha_venta, "%d") as day, DATE_FORMAT(v.fecha_venta, "%m") as month, DATE_FORMAT(v.fecha_venta, "%Y") as year, v.id_venta, p.descripcion as producto_descripcion, p.id_producto as producto, v.cantidad, v.importe, v.fecha_venta, v.importe_unitario, v.estado, v.forma_pago, v.descuento_aplicado, v.vendedor as vendedor_venta, vr.nombre from venta v, producto p, vendedor vr where v.producto = p.id_producto and v.vendedor = vr.id_vendedor and v.vendedor = ?',[id_vendedor]);

            let ventas = await db.query('select concat("v_",vr.id_vendedor) as id_vendedor_busqueda,DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta, DATE_FORMAT(v.fecha_venta,"%Y-%m-%d") as fecha_venta_origin, DATE_FORMAT(v.fecha_venta,"%d/%m/%Y") as fecha_venta_formateada, DATE_FORMAT(v.fecha_venta, "%d") as day, DATE_FORMAT(v.fecha_venta, "%m") as month, DATE_FORMAT(v.fecha_venta, "%Y") as year, v.id_venta, p.descripcion as producto_descripcion, p.id_producto as producto, p.precio_final as precio_venta,v.cantidad, v.importe, v.fecha_venta, v.importe_unitario, v.estado, v.forma_pago, v.descuento_aplicado, v.vendedor as vendedor_venta, vr.nombre from venta v, producto p,vendedor vr where v.producto = p.id_producto and v.vendedor = vr.id_vendedor and v.vendedor = ?',[id_vendedor]);
            
            res.json(ventas);

            await db.end();
        } catch (error) {
            return res.json(error);
        }

        
    }




    public async guardarVentaPorLector(req:Request,res:Response){

        try {
            const db = await conexion();

            let venta:IVenta = req.body;

            const producto = await db.query('select * from producto where codigo = ?',[req.body.codigo_producto])

            if(producto[0])
            {
                if(producto[0].stock > 0)
                { 
                    //descontamos de stock
                    await db.query('update producto set stock = stock-? where codigo = ?',[Number(req.body.cantidad),req.body.codigo_producto]);

                    //como se va alterar la planilla ya que hace recambio debemos actualizar todas las fechas de planilla de las ventas de este vendedor
                    await db.query("update venta set ? where vendedor = ?",[{fecha_venta:new Date()},req.body.vendedor]);

                    /* verificamos si ya se encuentra cargado o no el producto */
                    const verificar_venta_producto = await db.query('select * from venta where vendedor = ? and producto = ?',[req.body.vendedor,producto[0].id_producto]);

                    if(verificar_venta_producto[0]){
                        const datos_venta = {
                            cantidad:Number(verificar_venta_producto[0].cantidad)+Number(req.body.cantidad),
                            importe:(Number(verificar_venta_producto[0].cantidad)+Number(req.body.cantidad))*producto[0].precio_final,
                            fecha_venta: new Date(),
                            forma_pago:1,
                            descuento_aplicado:null,
                        }
                        await db.query("update venta set ? where id_venta = ?",[datos_venta,verificar_venta_producto[0].id_venta]);
                    }else{
                        const datos_venta = {
                            producto:producto[0].id_producto,
                            cantidad:req.body.cantidad,
                            importe_unitario:producto[0].precio_final,
                            importe:Number(producto[0].precio_final)*Number(req.body.cantidad),
                            fecha_venta: new Date(),
                            estado:1,
                            forma_pago:1,
                            descuento_aplicado:null,
                            vendedor:req.body.vendedor
                        }
                        await db.query('insert into venta set ?',[datos_venta]);
                    }
                    res.json(1);  
                    await db.end();
                }else{
                    return res.json(2);  
     
                }

            }
            
              

        } catch (error) {
            return res.json(0);
        }

        

    }




    public async eliminarVenta(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;
    
            await db.query("delete from venta where id_venta = ?",[codigo]);
            
            res.json(1);

            await db.end();
        } catch (error) {
            return res.json(0);
        }
    }

    public async actualizarVenta(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;

            let venta_actualizada = req.body;

            await db.query("update venta set ? where id_venta = ?",[venta_actualizada,codigo]);
            
            res.json("Se actualizo exitosamente");

            await db.end();
        } catch (error) {
            return res.json(error);
        }
    }

    public async obtenerUnaVenta(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let codigo = req.params.codigo;
    
            let unaVenta = await db.query("select * from venta where id_venta = ?",[codigo]);
            
            res.json(unaVenta[0]);

            await db.end();
        } catch (error) {
            return res.json(error);
        }

    }


    public async enviarStock(req:Request,res:Response)
    {
        try {
            const id = req.params.id;
            console.log(id);
            const db = await conexion();

            const venta = await db.query('select * from venta where id_venta = ?',[id])

            if(venta[0])
            {
                if(venta[0].cantidad > 1)
                {
                    await db.query("update venta set cantidad = cantidad-1 where id_venta = ?",[id]);
                }else{
                    await db.query('delete from venta where id_venta = ?',[id]);
                }
            }
            
            
            
            res.json(1);

            await db.end();   

        } catch (error) {
            console.log(error);
            return  res.json(0);
        }
    }

}
