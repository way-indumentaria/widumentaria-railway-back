export interface IVendedor{

    id_vendedor?:number;
    nombre:string;
    apellido:string;
    dni:number;
    domicilio:string;
    email:string;
    localidad:number;
    adjunto?:Text;
    telefono?:number;
    nom_garante?:string;
    ape_garante?:string;
    email_garante?:string;
    dni_garante?:number;
    domicilio_garante?:string;
    telefono_garante?:string;
    imagen_perfil?:string;
    public_id?:string,
    estado?:number
}
//probando