import { Response, Request } from "express";
import { conexion } from "../routes/database";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AutenticacionController 
{

    async registrar(req:Request, res:Response)
    {
        try {
            const salt = await bcrypt.genSalt(10);

            const password_cifrada = await bcrypt.hash(req.body.password,salt)

            const unUsuario = {
                username: req.body.username,
                password: password_cifrada,
                email: req.body.email
            }

            const db = await conexion();
            
            const resultado:any = await db.query('insert into usuario set ?',[unUsuario]);

            const token:string = jwt.sign({_id:resultado.insertId},process.env.TOKEN || '1234');

            res.json(token);
            await db.end();
        } catch (error) {
            return res.json(error);
        }
        
    }

    async ingresar(req:Request, res:Response)
    {
        try {
            const db = await conexion();

            const [usuario]:any = await db.query('select * from usuario where username = ?',[req.body.username]);
    
            if (!usuario[0]) 
            {
                res.json(1);    
            }
    
            else
            {
                const correctPassword = await bcrypt.compare(req.body.password, usuario[0].password);
    
                if (!correctPassword) 
                {
                    res.json(0);    
                }
                
                else
                {
                    const token:string = jwt.sign({_id:usuario[0].id_usuario},process.env.TOKEN || '1234');
    
                    res.json(token);
                }
            }
            await db.end();
        } catch (error) {
            return res.json(error);
        }
       
    }

}