import { Request, Response, NextFunction } from "express";
import { conexion } from '../routes/database';


export async function obtenerVentasImpagasPagas(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();

        //const ventas:any[] = await db.query('select ven.fecha_venta , sum((p.precio_way*ven.cantidad)-(p.precio_compra*ven.cantidad)) as importe from venta_detalle ven, producto p where p.id_producto = ven.producto and ven.fecha_venta BETWEEN ? AND ? and ven.estado = 1 group by MONTH(ven.fecha_venta)',[fdesde,fhasta]);
        const ventas_impagas:any[] = await db.query("SELECT vd.producto,sum(p.precio_way*vd.cantidad)as importe ,vip.vendedor, vip.fecha_venta FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 0 GROUP by MONTH(vip.fecha_venta),YEAR(vip.fecha_venta)",[fdesde,fhasta]);
        const ventas_pagas:any[] = await db.query("SELECT vd.producto,sum(p.precio_way*vd.cantidad)as importe ,vip.vendedor, vip.fecha_venta FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1 GROUP by MONTH(vip.fecha_venta),YEAR(vip.fecha_venta)",[fdesde,fhasta]);

        if(ventas_impagas && ventas_pagas)
        {
            let ventas_array:any = [];
        
            ventas_impagas.forEach((element) => {
                ventas_array.push(element.importe);
            });

            let objeto = {};
            objeto = {
                name:'Ventas impagas',
                data:ventas_array
            };


            /* Sector de ventas pagas */
            let ventas_array2:any = [];
            ventas_pagas.forEach((element) => {
                ventas_array2.push(element.importe);
            });

            let objeto2 = {};
            objeto2 = {
                name:'Ventas pagas',
                data:ventas_array2
            };

            let datos:any = [objeto,objeto2];
            //conformacion de series
            
            let datos_generales:any = [];
            datos_generales.push(datos);
    
            datos_generales.push(obtenerCategorias(fdesde,fhasta));

            await db.end()
            return datos_generales;
            
        }
    } catch (error) {
        return console.log(error)
    }
    
}

export async function obtenerVentasTotales(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();

        //const ventas:any[] = await db.query('select ven.fecha_venta , sum((p.precio_way*ven.cantidad)-(p.precio_compra*ven.cantidad)) as importe from venta_detalle ven, producto p where p.id_producto = ven.producto and ven.fecha_venta BETWEEN ? AND ? and ven.estado = 1 group by MONTH(ven.fecha_venta)',[fdesde,fhasta]);
        const ventas:any[] = await db.query("SELECT vd.producto,sum((p.precio_way*vd.cantidad)-(p.precio_compra*vd.cantidad))as importe ,vip.vendedor, vip.fecha_venta FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1 GROUP by MONTH(vip.fecha_venta),YEAR(vip.fecha_venta)",[fdesde,fhasta]);
    
        if(ventas)
        {
            let ventas_array:any = [];
          
            ventas.forEach((element) => {
                ventas_array.push(element.importe);
            });
    
            let objeto = {};
            objeto = {
                name:'Ventas totales',
                data:ventas_array
            };
    
            let datos:any = [objeto];
            
            let datos_generales:any = [];
            datos_generales.push(datos);
            datos_generales.push(obtenerCategorias(fdesde,fhasta));
    
            await db.end()
            return datos_generales;
            
        }        
    } catch (error) {
        return console.log(error)
    }
    

}


//INICIO OBTENCION DE VENTAS POR VENDEDOR
export async function obtenerSerie(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();
        let data:any = [];
        
        const vendedores:any[] = await db.query('select * from vendedor where estado = 1');
    
        if(vendedores)
        {
    
            for (let index = 0; index < vendedores.length; index++) {
    
                const importes:any= [];
                let objeto = {};
                const resultado:any[] = await obtenerVentasVendedores(fdesde,fhasta,vendedores[index].id_vendedor);
                if(resultado)
                {
                    resultado.forEach((element) => {
                        importes.push(element.importe);
                    });
    
                    objeto = {
                        name:vendedores[index].apellido+', '+vendedores[index].nombre,
                        data:importes
                    };
                    data.push(objeto);
                    
                }
            }
           
        }
    
    
        let datos_generales:any = [];
        datos_generales.push(data);
        datos_generales.push(obtenerCategorias(fdesde,fhasta))
    
        await db.end()
        return datos_generales;        
    } catch (error) {
        return console.log(error) 
    }
}
async function obtenerVentasVendedores(fdesde:string,fhasta:string,vendedor:number)
{
    const db = await conexion();
    //const resultado:any[] = await db.query('select vd.fecha_venta, sum(ifnull(vd.importe,0))as importe from venta_impaga_paga v, vendedor ven, venta_detalle vd where v.vendedor = ven.id_vendedor and vd.fecha_venta>= ? and vd.fecha_venta<= ? and v.vendedor = ?  and vd.estado = 1 group by MONTH(vd.fecha_venta)',[fdesde,fhasta,vendedor]);
    const resultado:any[] = await db.query('SELECT vd.producto,sum(p.precio_way*vd.cantidad)as importe ,vip.vendedor, vip.fecha_venta FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.vendedor = ? and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1 GROUP by vip.vendedor,MONTH(vip.fecha_venta),YEAR(vip.fecha_venta)',[vendedor,fdesde,fhasta]);
   
   //console.log(resultado)
    await db.end()
    return resultado;

    
}
//FIN  DE OBTENCIO DE VENTAS POR VENDEDOR


//CANTIDAD DE VENTAS POR VENDEDOR
export async function obtenerSerieCantidadVentas(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();
        let data:any = [];
        
        const vendedores:any[] = await db.query('select * from vendedor where estado = 1');

        if(vendedores)
        {

            for (let index = 0; index < vendedores.length; index++) {

                const cantidad:any= [];
                let objeto = {};
                const resultado:any[] = await obtenerCantidadVentasVendedores(fdesde,fhasta,vendedores[index].id_vendedor);
                if(resultado)
                {
                    resultado.forEach((element) => {
                        cantidad.push(element.cantidad);
                    });

                    objeto = {
                        name:vendedores[index].apellido+', '+vendedores[index].nombre,
                        data:cantidad
                    };
                    data.push(objeto);
                    
                }
            }
        
        }


        let datos_generales:any = [];
        datos_generales.push(data);
        datos_generales.push(obtenerCategorias(fdesde,fhasta))

        await db.end()
        return datos_generales;
    } catch (error) {
        return console.log(error)
    }
    

    
   
}
async function obtenerCantidadVentasVendedores(fdesde:string,fhasta:string,vendedor:number)
{
    const db = await conexion();
    //const resultado:any[] = await db.query('select vd.fecha_venta, sum(ifnull(vd.importe,0))as importe from venta_impaga_paga v, vendedor ven, venta_detalle vd where v.vendedor = ven.id_vendedor and vd.fecha_venta>= ? and vd.fecha_venta<= ? and v.vendedor = ?  and vd.estado = 1 group by MONTH(vd.fecha_venta)',[fdesde,fhasta,vendedor]);
    const resultado:any[] = await db.query('SELECT sum(vd.cantidad) as cantidad ,vip.vendedor, vip.fecha_venta FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.vendedor = ? and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1 GROUP by vip.vendedor,MONTH(vip.fecha_venta),YEAR(vip.fecha_venta)',[vendedor,fdesde,fhasta]);
   
   //console.log(resultado)
    await db.end()
    return resultado;

    
}
//FINALIZACION DE CANTIDAD DE VENTAS POR VENDEDOR



function obtenerCategorias(fdesde:string,fhasta:string)
{
    var fechaInicio = new Date(fdesde);
    var fechaFin    = new Date(fhasta);

    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Agos", "Sept", "Oct", "Nov", "Dic"];

    let categorias:any = [];
    let fecha_anterior = '';
    while(fechaFin.getTime() >= fechaInicio.getTime()){

        fechaInicio.setDate(fechaInicio.getDate() + 1);
        let fecha = monthNames[(fechaInicio.getMonth() + 1)] + '/' + fechaInicio.getFullYear();
        
        if(fecha != fecha_anterior)
        {
            categorias.push(fecha);
            fecha_anterior = fecha;
        }
    }

    return categorias;
}

//SELECT p.descripcion ,sum(ifnull(vd.importe,0))as importe FROM venta_detalle vd, venta_impaga_paga vip, producto p where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vd.fecha_venta >= '2020-01-01' and vd.fecha_venta <= '2021-08-09' GROUP by vd.producto order by importe desc limit 5

export async function obtenerVentasProducto(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();

        //const ventas:any[] = await db.query('select ven.fecha_venta , sum((p.precio_way*ven.cantidad)-(p.precio_compra*ven.cantidad)) as importe from venta_detalle ven, producto p where p.id_producto = ven.producto and ven.fecha_venta BETWEEN ? AND ? and ven.estado = 1 group by MONTH(ven.fecha_venta)',[fdesde,fhasta]);
        const ventas:any[] = await db.query("SELECT p.descripcion ,sum(p.precio_way*vd.cantidad) as importe FROM venta_detalle vd, venta_impaga_paga vip, producto p where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1 GROUP by vd.producto order by importe desc limit 5",[fdesde,fhasta]);
    
        if(ventas)
        {
            let ventas_array:any = [];
          
            ventas.forEach((element) => {
                let objeto = {
                    name:element.descripcion,
                    y:element.importe
                };
                ventas_array.push(objeto)
            });
    
           
    
            let objeto2 = {
                name:'Ventas por producto',
                data:ventas_array
            }
            let ventas_por_producto:any = []
            ventas_por_producto.push(objeto2)
    
            await db.end()
            return  ventas_por_producto;
        }        
    } catch (error) {
        return console.log(error)
    }
    
}


export async function obtenerImapagasPagasGastosTotales(fdesde:string,fhasta:string)
{
    try {
        const db = await conexion();

        //const ventas:any[] = await db.query('select ven.fecha_venta , sum((p.precio_way*ven.cantidad)-(p.precio_compra*ven.cantidad)) as importe from venta_detalle ven, producto p where p.id_producto = ven.producto and ven.fecha_venta BETWEEN ? AND ? and ven.estado = 1 group by MONTH(ven.fecha_venta)',[fdesde,fhasta]);
        const ventas_impagas:any = await db.query("SELECT sum(p.precio_way*vd.cantidad)as importe FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 0",[fdesde,fhasta]);
        const ventas_pagas:any = await db.query("SELECT sum(p.precio_way*vd.cantidad)as importe FROM producto p, venta_detalle vd, venta_impaga_paga vip where vd.producto = p.id_producto and vd.id_venta_paga_impaga = vip.id_impaga_paga and vip.fecha_venta >= ? and vip.fecha_venta <= ? and vd.estado = 1",[fdesde,fhasta]);
        const gastos_fijos:any = await db.query('SELECT sum(importe) as importe FROM gasto');
    
        let objeto = {
            impagas:ventas_impagas[0].importe,
            pagas:ventas_pagas[0].importe,
            gastos:gastos_fijos[0].importe
        }
        let respuesta:any = [];
        respuesta.push(objeto)
    
        await db.end()
        return  respuesta;        
    } catch (error) {
        return  console.log(error)
    }
    
}