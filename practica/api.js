const url = "https://dattebayo-api.onrender.com";

async function obtenerDatosPersonajes() {

    try{   const respuesta = await fetch(`${url}/characters`);
    if(!respuesta.ok) throw new Error("Error en la red");

    const personajes = await respuesta.json();
    return personajes.characters;} 
    
    catch(error){
        console.log("algo se totio");
    }
}

const lista = await obtenerDatosPersonajes();

const uzumaki = lista.find(c => c.personal.clan === "Uzumaki");
console.log(uzumaki);
