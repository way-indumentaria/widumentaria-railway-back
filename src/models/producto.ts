export interface IProducto
{
    id_producto?:number;
    codigo:string;
    descripcion:string;
    precio_compra:number;
    precio_way:number;
    precio_final:number;
    categoria:number;
    estado:number;
    descuento:number;
    categoria_sexo:number;
    fecha_carga:Date;
    stock?:number;
}