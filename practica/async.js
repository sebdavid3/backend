
// callback, utilizar una funcion como argumento
function prepararCafe(tipo, callback){
    console.log(`preparando un ${tipo}`);
    setTimeout(()=>{ `tu ${tipo} esta listo`}, 2000);
}

prepararCafe("Capuccino", (mensaje => {console.log(mensaje);
}))

//promises

const hacerPedido = (plato) => {
    return new Promise((resolve, reject) =>{
        const hayIngredientes = true;
        if(hayIngredientes){
            resolve(`${plato} servido`)
        } else {
            reject("No nos quedan ingredientes")
        }
    })
}

hacerPedido("Pizza")
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error));

// async await

async function desayunar(){
    try{
        console.log("Pidiendo desayuno...");
        const comida = await hacerPedido("Panqueques");
        console.log(comida);
        console.log("A comer");
    } catch (err){
        console.log("Hubo un problema: ",err);
        
    }
}


desayunar();

//promise all

const pedido1 = hacerPedido("Cafe");
const pedido2 = hacerPedido("tostadas");


async function ordenGrande() {
    const [cafe, tostadas] = await Promise.all([pedido1,pedido2]);
    console.log(`mesa lista ${cafe}, ${tostadas}`);
    
}

ordenGrande();



