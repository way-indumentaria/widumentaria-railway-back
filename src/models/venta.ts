export interface IVenta
{
    id_venta?:number;
    producto:number;
    cantidad:number;
    importe:number;
    fecha_venta:Date;
    importe_unitario:string;
    estado:number;
    forma_pago:number;
    descuento_aplicado:number;
    planilla:number;
    vendedor:number;
    producto_descripcion:string;
    vendedor_venta:number;
    nombre:string;
}