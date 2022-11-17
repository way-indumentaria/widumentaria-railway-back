import { conexion } from '../routes/database';

import { Request, Response, query } from "express";

import { obtenerSerie, obtenerVentasProducto, obtenerVentasTotales, obtenerVentasImpagasPagas, obtenerSerieCantidadVentas, obtenerImapagasPagasGastosTotales } from "../libs/obtenerSeries";

export class EstadisticasController {

    public  async impagasPagasGastos(req:Request, res:Response){
        try {

            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;

            console.log(fdesde+' - - '+fhasta)
            
            const ipg = await obtenerImapagasPagasGastosTotales(fdesde,fhasta)
            res.json(ipg[0]);  
                
        } catch (error) {
            return res.json(error);
        }
    }

    public  async cantidadVentasPorVendedor(req:Request, res:Response){
        try {

            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;

            console.log(fdesde+' - - '+fhasta)
            
            const cvpv = await obtenerSerieCantidadVentas(fdesde,fhasta)
            res.json(cvpv[0]);  
                
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
            const vtpf = await obtenerVentasTotales(fdesde,fhasta)
            res.json(vtpf[0]);  

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
               
            const vpp = await obtenerVentasProducto(fdesde,fhasta)
            res.json(vpp[0]); 
            
        } catch (error) {
            return res.json(error)
        }
    }


    public async ventasImpagasPagas(req:Request,res:Response)
    {
        try {
            const fdesde = req.params.fdesde;
            const fhasta = req.params.fhasta;
               
            const vip = await obtenerVentasImpagasPagas(fdesde,fhasta)
            res.json(vip[0]); 
            
        } catch (error) {
            return res.json(error)
        }
    }

}