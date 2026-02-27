/*Declara una constante llamada edad y asígnale un valor numérico.

Declara una variable mutable llamada categoria sin asignarle ningún valor inicial.

Escribe un condicional if/else. Si la edad es mayor o igual a 18, asigna el texto "Adulto" a la variable categoria. Si es menor, asígnale "Menor de edad".
*/

const edad = 20;
let categoria;

if(edad>=18){
    categoria = 'Adulto'
}else{
    categoria = 'Menor de edad'
}

/*
Declara una constante llamada precios y asígnale un arreglo con los números 10, 20 y 30.

Usa el método forEach o el ciclo moderno for...of (el que prefieras de nuestro cheatsheet) para recorrer el arreglo.

Dentro del ciclo, súmale 5 a cada precio y muestra el resultado usando console.log().
*/

const precios = [10,20,30];

for (let precio of precios){
    precio +=5; 
    console.log(precio);
}

/*
Escribe el código para cumplir con lo siguiente:

Crea una función flecha llamada calcularDoble.

La función debe recibir un parámetro llamado numero.

La función debe retornar el doble de ese numero (es decir, multiplicado por 2).

🔥 Reto adicional: Como es una operación muy sencilla, intenta escribir toda la función en una sola línea utilizando el "retorno implícito" que vimos en el cheatsheet (sin usar las llaves {} ni la palabra return).
*/

const calcularDoble = (numero) => numero*2;


/* 
Declara una constante edades con el arreglo [15, 22, 17, 30, 12].

Declara una constante llamada adultos.

Asígnale a adultos el resultado de aplicar el método filter() sobre el arreglo edades.

Dentro de filter(), usa una función flecha con retorno implícito para filtrar solo los números que sean mayores o iguales a 18.
*/

const edades = [15, 22, 17, 30, 12];

const adultos = edades.filter(edad => edad>=18);

/*
Crea una función clásica (usando la palabra reservada function) llamada obtenerPermiso.

La función debe recibir un parámetro llamado rol.

Dentro de la función, usa un bloque switch para evaluar el rol:

Si el rol es "admin", la función debe retornar (usando return) el texto "Permiso total".

Si el rol es "editor", debe retornar "Permiso de escritura".

Para cualquier otro caso (el valor por defecto), debe retornar "Permiso de solo lectura".
*/

function obtenerPermiso(rol){
    switch(rol){
    case "admin":
        return "Permiso total";

    case "editor":
        return "Permiso de escritura";
    
    default:
        console.log("Permiso solo de lectura");
    }
}

/*
Crea una función flecha llamada crearMensaje que reciba dos parámetros: nombre y rol.

Dentro de la función, llama a la función clásica obtenerPermiso(rol) que acabamos de corregir y guarda su resultado en una constante llamada permiso.

La función debe retornar un texto usando un Template Literal que diga exactamente: "El usuario [nombre] tiene [permiso]" (reemplazando los corchetes por los valores reales de las variables).
*/

const crearMensaje = (nombre, rol) => {
    
    const permiso = obtenerPermiso(rol);
    return `El usuario ${nombre} tiene ${permiso}`;

} 

const respuesta = readline("¿Cuál es tu color favorito?");