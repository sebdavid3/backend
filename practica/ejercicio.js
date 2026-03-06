/**
 * Asincronismo: Haz un fetch a la URL y obtén los personajes. (Recuerda que esta API, al igual que la de Naruto, devuelve un objeto y el array está en data.results).

Filter: Filtra solo a los personajes que estén vivos (status === "Alive") y que sean de especie humana (species === "Human").

Sort: Ordena los resultados alfabéticamente por su nombre.

Map: Crea un nuevo array de objetos que solo contenga el nombre, el género y el nombre de su origen (pista: está en origin.name).

Find: Busca dentro de tu lista filtrada si existe el personaje "Summer Smith".

Every: Verifica si todos los personajes de tu lista filtrada tienen género "Female" o "Male" (que no sea "unknown").

Reduce: Calcula el total de letras sumando los nombres de todos los personajes de tu lista final.
 */



const url = "https://rickandmortyapi.com/api/character";

async function extraerDatos() {
    try{
        const datos = await fetch(url);
        if(!datos.ok){throw new Error("Error en la red");
        }
        const personajes = await datos.json();
        return personajes.results;
    }
    catch(error){
        console.log("Algo se jodió");
    }    
}



const personajes = await extraerDatos();


const vivos =