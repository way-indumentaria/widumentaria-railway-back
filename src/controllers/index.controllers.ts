//Importamos las interfaces "Response" y "Request" desde "express"
import { Response, Request } from "express";

//Funcion que mostrara un mensaje de bienvenida
export function mensaje_bienvenida(req:Request,res:Response) //Definimos parametros para "Request" y "Response", que nos permitira recibir solicitudes y respuestas
{
    res.json("Esta es la pagina principal de la pagina"); //Envia una respuesta en formato json
}