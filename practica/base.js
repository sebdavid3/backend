// Variables

var nombre = 'Sebastian'; // forma deprecada
// la forma recomendada para declarar variables es let y const

const nombre1 = 'David'; // const se utiliza para variables que no cambian
let nombre2 = 'Juan'; // let se utiliza para variables que cambian

console.log(nombre);
console.log(nombre1);
console.log(nombre2);

// la diferencia entre let y const es que let se puede cambiar y const no   

// Condicionales

// if / else / else if

let edad = 17;
let cumple = true;

if(edad < 18 && cumple == false){
    console.log('Lo siento, no puedes votar')
}else if(cumple == true){
    edad++
    console.log('Puedes votar')
}else{
    console.log('No puedes votar')
}

console.log(edad);

// switch

let opcion = 4;
let name1 = 'Sebastian';


switch(opcion){
    case 1:
        name1='David';
        break;
    case 2:
        name1='Juan';
        break;
    case 3:
        name1='Maria';
        break;
    default:
        name1='No hay nombre';
        break;
}

console.log(name1);

// Bucles 

// for/ for
let n=0;
for(i=0;i<=100; i++){
    n=i;
    console.log(n);
        
}

// while 

while(n>0){
    n--;
    console.log(n);
    
}

//ForEach
let index = 0;
const nums = [1,2,3,4,5,6,7,8,9,10];
nums.forEach ((nums) => {
    index++;
    console.log(nums**index);
    
})

//For ... of  lo mismo q el de arriba pero mejor

const names = ['gogui','papoi', 'mi toti', 'amor'];

for (const name of names){
    console.log(name);
    
}

// Funciones 

//clasica

function suma(a,b){
    return a+b
}
console.log(suma(2,2));

//arrow function lo estandar

const suma2 = (a,b) => console.log(a+b);


suma2(2,4)
