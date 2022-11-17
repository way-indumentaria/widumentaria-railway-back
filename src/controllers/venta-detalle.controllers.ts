import { conexion } from "../routes/database";
import { Request, Response } from "express";
import { IVentaDetalle } from '../models/venta_detalle';


export class VentaDetalleController {

    public async enviarTodoPagas(req:Request,res:Response){

        try {
            const db = await conexion();

            let id_vip = req.params.id_vip;
            let estado = 0;
    
            let venta_impagas = await db.query('select ven.id_venta_detalle,ven.id_venta_paga_impaga,ven.producto,ven.cantidad as cantidad, (ven.importe*ven.cantidad) as importe,p.codigo as codigo_producto,p.descripcion as descripcion_producto,p.precio_final,p.precio_way as precio_costo,ven.estado,ven.estado_confirmacion,DATE_FORMAT(ven.fecha_venta,"%d/%m/%Y") as fecha_venta, DATE_FORMAT(vip.fecha_venta,"%d/%m/%Y") as fecha_planilla from venta_detalle ven, producto p, venta_impaga_paga vip where ven.producto = p.id_producto and ven.id_venta_paga_impaga = ? and ven.id_venta_paga_impaga = vip.id_impaga_paga and ven.estado = ?',[id_vip,estado]);
            
            for await (let vi of venta_impagas) {
                await db.query('update venta_detalle SET estado = 1 where id_venta_detalle = ?',[vi.id_venta_detalle])
            };
            
            await db.end();
            res.json('Operación exitosa!');
 
        } catch (error) {
            res.json(error);
        }
     }
    
    public async listaImpagasPagas(req:Request,res:Response){

        try {
            const db = await conexion();

            let id_vip = req.params.id_vip;
            let estado = Number(req.params.estado);
    
            let venta_impagas = await db.query('select ven.id_venta_detalle,ven.id_venta_paga_impaga,ven.producto,ven.cantidad as cantidad, (ven.importe*ven.cantidad) as importe,p.codigo as codigo_producto,p.descripcion as descripcion_producto,p.precio_final,p.precio_way as precio_costo,ven.estado,ven.estado_confirmacion,DATE_FORMAT(ven.fecha_venta,"%d/%m/%Y") as fecha_venta, DATE_FORMAT(vip.fecha_venta,"%d/%m/%Y") as fecha_planilla from venta_detalle ven, producto p, venta_impaga_paga vip where ven.producto = p.id_producto and ven.id_venta_paga_impaga = ? and ven.id_venta_paga_impaga = vip.id_impaga_paga and ven.estado = ?',[id_vip,estado]);
            
            res.json(venta_impagas[0]);

            await db.end();
 
        } catch (error) {
            return res.json(error);
        }
     }

     public async enviaraPagasImpagas(req:Request,res:Response){

        try {
            const db = await conexion();

            let id_venta_detalle = req.params.id_venta_detalle;
            let id_producto = req.params.id_producto;
            let estado = req.params.estado;

            const buscar_cantidad_vd = await db.query('select * from venta_detalle where id_venta_detalle = ?',[id_venta_detalle]);
            if(buscar_cantidad_vd[0]){

                if(Number(estado) == 0)
                {
                    const datos_vip = {
                        estado:0
                    }
                    await db.query("update venta_impaga_paga set ? where id_impaga_paga = ?",[datos_vip,buscar_cantidad_vd[0].id_venta_paga_impaga]);
                }
                
                if(buscar_cantidad_vd[0].cantidad > 1)
                {
                    await db.query('update venta_detalle SET cantidad = cantidad-1 where id_venta_detalle = ?',[id_venta_detalle]);
                
                    const venta_detalle = await db.query('select * from venta_detalle where producto = ? and estado = ? and id_venta_paga_impaga = ?',[id_producto,estado,buscar_cantidad_vd[0].id_venta_paga_impaga]);

                    if(venta_detalle[0]){
                        console.log('entro al if venta detalle');
                        await db.query('update venta_detalle SET cantidad = cantidad+1 where estado = ? and id_venta_detalle = ?',[estado,venta_detalle[0].id_venta_detalle]);
                    }else{
                        const venta = {
                            id_venta_paga_impaga:buscar_cantidad_vd[0].id_venta_paga_impaga,
                            producto:id_producto,
                            cantidad:1,
                            importe:100,
                            estado:estado,
                            fecha_venta:buscar_cantidad_vd[0].fecha_venta
                        }
                        await db.query('insert into venta_detalle set ?',[venta]);
                    }
                
                    res.json(1);

                }else{
                    console.log('estado: '+estado);
                    let state = Number(estado);
                    //actualizamos la planilla en 0 o 1 cuando este finalizado la totalidad de los pagos o no
                    if(state == 1)
                    {
                        const datos_vip = {
                            estado:1
                        }
                        await db.query("update venta_impaga_paga set ? where id_impaga_paga = ?",[datos_vip,buscar_cantidad_vd[0].id_venta_paga_impaga]);
                    }

                    console.log(id_venta_detalle);
                    await db.query('delete from venta_detalle where id_venta_detalle = ?',[id_venta_detalle]);
                
                    const venta_detalle = await db.query('select * from venta_detalle where producto = ? and estado = ? and id_venta_paga_impaga = ?',[id_producto,estado,buscar_cantidad_vd[0].id_venta_paga_impaga]);
            
                    if(venta_detalle[0]){
                        await db.query('update venta_detalle SET cantidad = cantidad+1 where estado = ? and id_venta_detalle = ?',[estado,venta_detalle[0].id_venta_detalle]);
                    }else{
                        
                        const venta = {
                            id_venta_paga_impaga:buscar_cantidad_vd[0].id_venta_paga_impaga,
                            producto:id_producto,
                            cantidad:1,
                            importe:100,
                            estado:estado,
                            fecha_venta:buscar_cantidad_vd[0].fecha_venta
                        }
                        await db.query('insert into venta_detalle set ?',[venta]);
                    }
                    
                    res.json(1);

                    await db.end();
                }
            }    
        } catch (error) {
            console.log(error);
            return res.json(error);
        }
    }



    public async enviarStockVenta(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            let id_venta_detalle = req.params.id_venta_detalle;
            let id_producto = req.params.id_producto;
            let tipo_movimiento = Number(req.params.tipo_movimiento);
            let vendedor = req.params.vendedor;

            const un_producto= await db.query('select * from producto where id_producto = ?',[id_producto]);

            const buscar_cantidad_vd = await db.query('select * from venta_detalle where id_venta_detalle = ?',[id_venta_detalle]);
            
            if(buscar_cantidad_vd[0])
            {
                if(buscar_cantidad_vd[0].cantidad > 1)
                {
                    console.log('Mayor a uno: esntonces UPDATE');
                    await db.query('update venta_detalle SET cantidad = cantidad-1 where id_venta_detalle = ?',[id_venta_detalle]);
                    if(tipo_movimiento == 1)
                    {
                        console.log('Movimiento a nueva venta');
                        const grilla_ventas = await db.query('select * from venta where producto = ? and vendedor = ?',[id_producto,vendedor]);
                        if(grilla_ventas[0])
                        {
                            await db.query('update venta SET cantidad = cantidad+1 where id_venta = ?',[grilla_ventas[0].id_venta]);
                        }else{
                            const venta = {
                                producto:id_producto,
                                cantidad:1,
                                importe:un_producto[0].precio_final,
                                importe_unitario:un_producto[0].precio_final,
                                fecha_venta:new Date(),
                                estado:1,
                                vendedor:vendedor,
                                forma_pago:1,
                                descuento_aplicado:null
                            }
                            await db.query('insert into venta set ?',[venta]);
                        }
                    }else{
                        console.log('Movimiento a stock');
                        await db.query('update producto SET stock = stock+1 where id_producto = ?',[id_producto]);
                    }
                }
                else{
                    console.log('Menor a uno: esntonces DELETE');

                    const vd = await db.query('select * from venta_detalle where id_venta_detalle = ?',[id_venta_detalle]);

                    await db.query('delete from venta_detalle where id_venta_detalle = ?',[id_venta_detalle]);

                    const vpi = await db.query('select * from venta_detalle where id_venta_paga_impaga = ?',[vd[0].id_venta_paga_impaga]);
                    
                    if(vpi[0] == undefined)
                    {
                        await db.query('delete from venta_impaga_paga where id_impaga_paga = ?',[vd[0].id_venta_paga_impaga]);
                    }


                    if(tipo_movimiento == 1)
                    {
                        console.log('Movimiento a nueva venta');
                        const grilla_ventas = await db.query('select * from venta where producto = ? and vendedor = ?',[id_producto,vendedor]);
                        if(grilla_ventas[0])
                        {
                            console.log('Se actualiza nueva venta');
                            await db.query('update venta SET cantidad = cantidad+1, importe=(cantidad*importe) where id_venta = ?',[grilla_ventas[0].id_venta]);
                        }else{
                            console.log('Se inserta nueva venta nueva venta');
                            console.log(un_producto[0]);
                            console.log(vendedor);
                            const venta = {
                                producto:id_producto,
                                cantidad:1,
                                importe:un_producto[0].precio_final,
                                importe_unitario:un_producto[0].precio_final,
                                fecha_venta:new Date(),
                                estado:1,
                                vendedor:Number(vendedor),
                                forma_pago:1,
                                descuento_aplicado:null
                            }
                            await db.query('insert into venta set ?',[venta]);
                        }
                    }else{
                        console.log('Movimiento a stock');
                        await db.query('update producto SET stock = stock+1 where id_producto = ?',[id_producto]);
                    }

                   
                }
            }
            
            res.json("1")

            await db.end();


        } catch (error) {
            return res.json(error);
        }
    }

    async confirmarImpagas(req:Request,res:Response)
    {
        try {
            const id = req.params.id;
            const estado =  req.body.estado;
    
            const db = await conexion();
            await db.query('update venta_detalle SET estado_confirmacion = ? where id_venta_detalle = ?',[estado,id]);
            
            res.json('Se confirmo exitosamente la venta impaga.');

            await db.end();
        } catch (error) {
            return res.json(error);
        }
       
    }

    public async getTotalPagasImpagas(req:Request,res:Response)
    {
        try {
            const db = await conexion();

            const vendedor = req.params.vendedor;
            console.log(vendedor);
            const ultima_planilla = await db.query('select max(id_impaga_paga) as id_ip from venta_impaga_paga where vendedor = ?',[Number(vendedor)]);
            console.log(ultima_planilla[0].id_ip);
            if(ultima_planilla[0])
            {
                const impagas = await db.query('select sum(p.precio_way*cantidad) as total from venta_detalle ven, producto p where ven.producto = p.id_producto and id_venta_paga_impaga = ? and ven.estado = 0',[ultima_planilla[0].id_ip]);
                const pagas = await db.query('select sum(p.precio_way*cantidad) as total from venta_detalle ven, producto p where ven.producto = p.id_producto and id_venta_paga_impaga = ? and ven.estado = 1',[ultima_planilla[0].id_ip]);
               
                const datos = {
                    total_impagas:impagas[0].total,
                    total_pagas:pagas[0].total
                }
                console.log(datos);
                res.json(datos);
            }else{
                const datos = {
                    total_impagas:0,
                    total_pagas:0
                }
                console.log(datos);
                res.json(datos);
            }

            await db.end();
        } catch (error) {
            return res.json()
        }
    }
}
