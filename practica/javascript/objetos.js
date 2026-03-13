//Declarar un objeto

const usuario = {
    nombre: 'Sebastian',
    apellido: 'Ibanez',
    edad: 12,
    genero: 'masculino',
    esPremium: true,
    saludar(){
        console.log('Hola mi nombre es '+this.nombre);
        
    }
}
console.log(usuario)

//Consultar informacion

//punto
console.log(usuario.nombre);
console.log(usuario.genero);

//corchete

const key1 = 'esPremium';
console.log(usuario[key1]);


//modificar

usuario.edad = 20;
usuario.insta='sebdavid.sql';
delete usuario.genero;
console.log(usuario.edad);
console.log(usuario.insta);
console.log(usuario.genero);

// funciones dentro de objetos

const Horus = {

    raza : 'felix',
    edad : 'desconocida',
    deadName : 'Lino',
    comer(comida) {
        console.log(`Hola mi nombre es Horus y mi raza es ${this.raza} y tengo hambre de ${comida} en esta monda`)
    }
}
Horus.comer('mirringo');

// Freeze objetos 


Object.freeze(Horus);
Horus.olor = 'feo';
Horus.edad = 'conocida';
Horus.deadName = 'miamol';
console.log(Horus);


// Object Seal (Si se le pueden modificar los valores ya existentes)

const violin = {
    cuerdas: ['Sol', 'Re', 'La', 'Mi'],
    marca: 'Guarneri',
    age:1777
}

Object.seal(violin);

violin.marca = 'Greeko';
violin.dueno = 'el pripra';
console.log(violin.marca, violin.dueno);




//Funciones que crear objetos

function Login(email, password){
    this.email = email;
    this.password = password;

    this.recoveryPassword = function(){
        console.log(`Hola tu clave es ${this.password}`);
    }
}


const user1 = new Login('hola@gmail.com', 'admin');
console.log(user1);
