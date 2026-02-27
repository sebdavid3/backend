const notas = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];

console.log(notas.length);
console.log(notas[0]);
console.log(notas[notas.length -1]);

//Metodos

notas.push('do');
console.log(notas[notas.length -1]);

notas.pop();
console.log(notas);

notas.unshift('si');
console.log(notas[0]);

notas.shift();
console.log(notas[0]);


//map

const numeros = [1,2,3,4,5];
const dobles = numeros.map(n => n * 2);
console.log(dobles);

//filter()

const edades = [18,20,22,1,2,3,4,5,6]
const adultos = edades.filter(n => n>=18);
console.log(adultos);


//Buscar

const los_goti = ['david', 'victoria','sebas'];
console.log(los_goti.includes('victoria'));

console.log(los_goti.find(s => s.startsWith('s')));





//

const guerreros = [
    { nombre: "Goku", nivel: 9001, tipo: "Sayayin" },
    { nombre: "Vegeta", nivel: 8500, tipo: "Sayayin" },
    { nombre: "Krillin", nivel: 500, tipo: "Humano" },
    { nombre: "Piccolo", nivel: 3000, tipo: "Namekusei" }
];

nombre_guerreros = guerreros.map(n => n.nombre);
console.log(nombre_guerreros);

piccolo = guerreros.filter(n => n.nombre == "Piccolo");
console.log(piccolo);

guerrero_primerHum = guerreros.find(n=> n.tipo === "Humano" );
console.log(guerrero_primerHum);

guerreros_fuertes = guerreros.every(g => g.nivel >= 3000);
if(guerreros_fuertes){
    console.log("Todos tienen mas de 3000");
}else{
    console.log("No todos los guerreros son fuertes");
}


guerreros_namek = guerreros.some(g => g.tipo === "Namekusei");
if(guerreros_namek){
    console.log("Hay al menos un Namek");
}else{
    console.log("No hay Namek");
}

debilFuerte = guerreros.sort((a,b) => a.nivel - b.nivel)
 console.log(debilFuerte);
 
fuerteDebil = guerreros.sort((a,b) => b.nivel - a.nivel )
 console.log(debilFuerte);

puntosEquipo = guerreros.reduce((total, valor) => total + valor.nivel, 0);
console.log(puntosEquipo);



