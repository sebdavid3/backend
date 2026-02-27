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
console.log(personajes);


