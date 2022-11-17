//Importamos el metodo "createPool" que nos permitira conectarnos a la base de datos desde "promise-mysql"
//import { createPool } from "promise-mysql";
import {createPool} from 'mysql2/promise'
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
  } from "../config";

//Funcion que se encargara de la conexion a las base de datos
export async function conexion() 
{
    //Constante en la que definiremos las propiedades de "createPool" en la constante "connect", para que poder conectarse a la base de datos
    /*const connect = await createPool({
        host:'us-cdbr-east-04.cleardb.com',
        user:'b41346736cbe93',
        password:'5ebb0c4b',
        database:'heroku_184c871a0f3b411'
    });*/

    /*const connect = await createPool({
        host:DB_HOST,
        user:DB_USER,
        password:DB_NAME,
        port:DB_PORT,
        database:DB_PASSWORD
    });*/

    const connect = await createPool({
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        multipleStatements:true,
        typeCast: function(field,next){
            if(field.type == 'VAR_STRING'){
                return field.string()
            }
            return next()
        }
    })

    //Entrega una respuesta
    return connect;
}