import express, { Router } from "express";
import { RootApi, RootMonsters,MonsterNorm } from "../interfaces";
export const router = Router();

const url = 'https://www.dnd5eapi.co/api/2014/monsters'
const baseUrl = 'https://www.dnd5eapi.co'

router.get('/', async(req,res)=>{
    try {
        
        const respuesta = await fetch(url);
        const datos = (await respuesta.json()) as RootApi;
        const datos100 = datos.results.slice(0,30);

        const rutasMonsters = datos100.map(monsters => fetch(baseUrl+monsters.url).then(r => r.json())) 
        const datosMonsters = await Promise.all(rutasMonsters) as RootMonsters[]

        const monsterNorm: MonsterNorm[] = datosMonsters.map(monster => {
            const immuneCount = monster.damage_immunities.length
            const resistCount = monster.damage_resistances.length
            const vulnCount = monster.damage_vulnerabilities.length
            const hasLegendary = monster.legendary_actions?.length>0
            const velocidades = monster.speed ? Object.values(monster.speed).map(v => parseInt(v as string)) : [0];
            const maxSpeed = Math.max(...velocidades);
            
            return{
                index : monster.index,
                name : monster.name,
                size : monster.size,
                type : monster.type,
                alignment : monster.alignment,
                cr: monster.challenge_rating,
                ac: monster.armor_class[1]?.value|| 0,
                hp:monster.hit_points,
                speed:maxSpeed,
                stats: {
                    str: monster.strength,
                    dex: monster.dexterity,
                    con: monster.constitution,
                    int: monster.intelligence,
                    wis: monster.wisdom,
                    cha: monster.charisma
                },
                immuneCount,
                resistCount,
                vulnCount,
                hasLegendary

            }
        })

        const { minCr, minHp, tipoBusqueda } = req.query;
        let respuestaFinal: any = monsterNorm; 

       // ==========================================
// PARTE B: CONSULTAS
// ==========================================

// 1. FILTER: Arreglo de monstruos con cr >= 5 y hp >= 80
const peligrosos = monsterNorm.filter(m => m.cr >= 5 && m.hp >= 80);


// 2. FIND: El PRIMER monstruo (un solo objeto) que sea "dragon" y cr >= 6
const primerDragonFuerte = monsterNorm.find(m => m.type === "dragon" && m.cr >= 6);


// 3. SOME: Devuelve un Booleano (true/false) si existe AL MENOS UNO legendario
const hayLegendarios = monsterNorm.some(m => m.hasLegendary === true);


// 4. EVERY: Devuelve un Booleano (true/false) si ABSOLUTAMENTE TODOS cumplen
// Object.keys(m.stats).length cuenta cuántas llaves tiene el objeto stats (str, dex, etc.)
const todosValidos = monsterNorm.every(m => Object.keys(m.stats).length === 6 && m.hp > 0);


// 5. REDUCE: Agrupar por type y calcular count, maxHP y avgCR
const statsPorTipo = monsterNorm.reduce((acc: any, m) => {
    const tipo = m.type;
    
    // Si el tipo no existe en el acumulador, lo inicializamos
    if (!acc[tipo]) {
        acc[tipo] = { count: 0, totalCR: 0, maxHP: 0 };
    }

    acc[tipo].count += 1;
    acc[tipo].totalCR += m.cr;
    acc[tipo].maxHP = Math.max(acc[tipo].maxHP, m.hp); // Forma corta y pro de sacar el mayor

    return acc;
}, {}); // {} es el acumulador inicial

// Calculamos el promedio y borramos el totalCR para que la salida quede exacta al taller
for (const tipo in statsPorTipo) {
    statsPorTipo[tipo].avgCR = statsPorTipo[tipo].totalCR / statsPorTipo[tipo].count;
    delete statsPorTipo[tipo].totalCR;
}


// 6. REDUCE: Clasificar en "buckets" (categorías) según su CR
const bucketsCR = monsterNorm.reduce((acc: any, m) => {
    let bucket = "";

    // Clasificamos al monstruo en su categoría
    if (m.cr <= 1) bucket = "0-1";
    else if (m.cr >= 2 && m.cr <= 4) bucket = "2-4";
    else if (m.cr >= 5 && m.cr <= 9) bucket = "5-9";
    else bucket = "10+";

    // Si la categoría no existe en el acumulador, la creamos en 0
    if (!acc[bucket]) {
        acc[bucket] = 0;
    }

    // Le sumamos 1 a esa categoría
    acc[bucket] += 1;

    return acc;
}, {}); // {} es el acumulador inicial

        res.json(respuestaFinal)

    } catch (error) {
        res.json(`error:${error}`)
    }
})