//importamos la funcion express desde la carpeta express
import express, { Application } from "express";

//import morgan from "morgan";

//Importamos el enrutadorIndex desde el archivo "index.route"
import enrutadorIndex from "./routes/index.route";

//Importamos los enrutadores
import enrutadorGasto from "./routes/gasto.route";
import enrutadorCategoria from './routes/categoria.route';
import enrutadorProducto from "./routes/producto.route";
import enrutadorVenta_impaga_paga from "./routes/venta_impaga_paga.routes";
import enrutadorVenta from "./routes/venta.route";
import enrutadorLocalidad from "./routes/localidad.route";
import enrutadorCatgasto from "./routes/catgasto.route";
import enrutadorProvincia from "./routes/provincia.route";
import  cors  from "cors";
import enrutadorVendedor from "./routes/vendedor.route";
import enrutadorAut from "./routes/autenticacion.route";
import enrutadorVentaDetalle from "./routes/venta-detalle.routes";
import enrutadorEstadisticas from "./routes/estadisticas.routes";


//Clase donde estaran creados los atributos, metodos y donde seran ejecutados
export class Server {

    //Es un atributo que pertenece a express
    app:Application; 

    //Es un metodo que se ejecuta por la instancia del servidor
    constructor() 
    {
        //Almacenamos "express" en el atributo "app"
        this.app = express();
        
        //Ejecutamos el metodo "configuracion"
        this.configuracion();

        //Ejecutamos el metodo middleware
        this.middleware();

        //Ejecutamos el metodo "routes"
        this.routes();

    }

    //Mmetodo que permite realizar ajustes
    configuracion()
    {
        //Busca algun puerto disponible para utilizar y en el caso que no lo encuentre, utilizamos el puerto 3000 por defecto y se almacena en el atributo "app"
        this.app.set('port', process.env.PORT || 3000);
    }

    //Metodo que permite darles uso a las rutas
    routes()
    {
        //Le damos uso al enrutadorIndex
        this.app.use(enrutadorIndex);

        this.app.use(enrutadorCatgasto);

        this.app.use(enrutadorGasto);

        this.app.use(enrutadorCategoria);

        this.app.use(enrutadorProducto);

        this.app.use(enrutadorVenta_impaga_paga);

        this.app.use(enrutadorVenta);

        this.app.use(enrutadorLocalidad);

        this.app.use(enrutadorProvincia);

        this.app.use(enrutadorVendedor);

        this.app.use(enrutadorAut);

        this.app.use(enrutadorVentaDetalle);

        this.app.use(enrutadorEstadisticas);
    }

    //Metodo donde se realizan las configuraciones extras
    middleware()
    {
        //Especificamos que "app" use formato "json"
        this.app.use(express.json());

        this.app.use(cors());

        //this.app.use(morgan('dev'));
    }

    //Metodo encargado de correr el servidor bajo un puerto determinado
    listen()
    {
        //Introducimos la funcion "listen" en el atributo y declaramos que corra en el puerto 3000
        this.app.listen(this.app.get('port')); 

        //Es un mensaje que aparecera si se ejecuta el puerto de forma correcta
        console.log('Servidor corriendo en el puerto ',this.app.get('port')); 

    }

}