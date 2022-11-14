export interface IVentaDetalle {
    id_venta_detalle?:number;
    id_venta_paga_impaga:number;
    producto:number;
    cantidad:number;
    estado:number;
    fecha_venta:Date;
    estado_confirmacion?:number;
}