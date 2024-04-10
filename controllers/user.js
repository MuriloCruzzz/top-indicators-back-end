import { json } from "express";
import { db } from "../db.js";


export const ValidarUsuario = (req, res) => {

    const user = req.body.user;
    const senha = req.body.senha;


    const queryUsuario = "SELECT * FROM usuario where nome = '"+ user +"' and senha = '"+ senha + "';";
    //console.log(queryUsuario);
    
    db.query(queryUsuario, (err, data) => {
        if (err) return res.status (400). res.json(err);
        if (data.length > 0){

            const grupo_acesso = data[0].Grupo_Acesso;
            console.log("Logado");
            return res.status(200). json({"menssage": "sucess", "grupo_acesso": grupo_acesso});
           
   
        }
        else {
            console.log("Deslogado");
            return res.status(404). json({"menssage": "failed"});
        }


    });
};

