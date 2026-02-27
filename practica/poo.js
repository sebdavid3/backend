class Usuario{
    #saldo = 0;

    constructor(nombre, email){
        this.nombre = nombre;
        this.email = email;
    }

    presentarse(){
        console.log(`Hola mi nombre es ${this.nombre}`);
        
    }

    deposito(cantidad){
        this.#saldo = this.#saldo+ cantidad;
        console.log(`recibido ${cantidad}, tu nuevo saldo es ${this.#saldo}`);
        
    }

}

user1 = new Usuario('David','david@email.com');
user1.presentarse();

user1.deposito(10);


class Admin extends Usuario{
    borrarUsuario(usuario){
        delete usuario.nombre;
        delete usuario.email;
    }
}

const admin1 = new Admin('sebastian', 'yo@lol.com');

admin1.borrarUsuario(user1);
user1.presentarse();