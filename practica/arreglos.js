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


