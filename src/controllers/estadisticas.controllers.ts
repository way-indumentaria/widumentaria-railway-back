import { conexion } from '../routes/database';

import { Request, Response, query } from "express";

import { obtenerSerie, obtenerVentasProducto, obtenerVentasTotales, obtenerVentasImpagasPagas, obtenerSerieCantidadVentas, obtenerImapagasPagasGastosTotales } from "../libs/obtenerSeries";

export class EstadisticasController {

    public  async impagasPagasGastos(req:Request, res:Response){
        try {

            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;

            console.log(fdesde+' - - '+fhasta)
               
            res.json(await obtenerImapagasPagasGastosTotales(fdesde,fhasta));  
                
        } catch (error) {
            return res.json(error);
        }
    }

    public  async cantidadVentasPorVendedor(req:Request, res:Response){
        try {

            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;

            console.log(fdesde+' - - '+fhasta)
               
            res.json(await obtenerSerieCantidadVentas(fdesde,fhasta));  
                
        } catch (error) {
            return res.json(error);
        }
    }

    public  async ventasPorVendedor(req:Request, res:Response){
        try {

            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;

            console.log(fdesde+' - - '+fhasta)
            const vpv = await obtenerSerie(fdesde,fhasta)
            res.json(vpv[0]);  
                
        } catch (error) {
            return res.json(error);
        }
    }


    public async ventasTotalesPorFecha(req:Request,res:Response)
    {
        try {
            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;
               
            res.json((await obtenerVentasTotales(fdesde,fhasta))[0]);  

        } catch (error) {
            console.log(error);
            return res.json(error)
        }
    }


    public async ventasPorProducto(req:Request,res:Response)
    {
        try {
            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;
               
            res.json(await obtenerVentasProducto(fdesde,fhasta)); 
            
        } catch (error) {
            return res.json(error)
        }
    }


    public async ventasImpagasPagas(req:Request,res:Response)
    {
        try {
            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;
               
            res.json(await obtenerVentasImpagasPagas(fdesde,fhasta)); 
            
        } catch (error) {
            return res.json(error)
        }
    }

}