import express, { Router,Request,Response } from "express";
import { PokeResult, PokeRoot,PokeDataRoot } from "../interfaces";
import { json } from "node:stream/consumers";
export const router = Router();

const url = "https://pokeapi.co/api/v2/pokemon"

router.get("/", async (req:Request,res:Response)=>{

    try {
        const respuesta = await fetch(url);
        const datos = (await respuesta.json()) as PokeRoot
        const pokemones = datos.results.slice(0,30);

        const promesas = pokemones.map(p => fetch(p.url).then(r => r.json()))
        const datosP = await Promise.all(promesas)

        const PokeNorm = datosP.map(p => {
            
            return{
                id:  p.id,
                name: p.name,
                tipos: p.types.map((t: any) => t.type.name),
                peso: p.weight,
                altura: p.number,
                hp: p.stats[0].base_stat,      // Entro al 1er elemento y saco el base_stat
                ataque: p.stats[1].base_stat   // Entro al 2do elemento y saco el base_stat
                
            }
        })

        const {minHp, minAtaque, BuscarNombre} = req.query()

        res.json(PokeNorm)
        
    } catch (error) {
        console.log(error);
    }
    

})