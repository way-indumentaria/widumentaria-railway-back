"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server"); //Importamos la clase server desde el archivo server.ts
//Construccion de la funcion
function principal() {
    const servidor = new server_1.Server(); //Se crea la instancia de la clase, que es la llave de acceso a todas sus funciones y se ejecuta el constructor en Server 
    servidor.listen(); //Se ejecuta la funcion
}
//Ejecutacion de la funcion
principal();
