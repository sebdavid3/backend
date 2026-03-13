# Guía de Estudio Definitiva: Backend con Node.js, Express y TypeScript

Bienvenido a tu guía de estudio. El objetivo aquí no es memorizar código, sino **entender el flujo lógico** y el **porqué** detrás de cada herramienta. Domina estos conceptos y el parcial será un proyecto más.

---

## 1. Configuración Inicial del Proyecto

Para iniciar el proyecto desde cero, este es el orden lógico de comandos:

```bash
# 1. Inicializar el proyecto Node (crea package.json)
npm init -y

# 2. Instalar dependencias de producción
npm i express

# 3. Instalar dependencias de desarrollo (TypeScript y Tipos)
npm i -D typescript @types/express @types/node ts-node-dev

# 4. Crear el archivo de configuración de TypeScript (tsconfig.json)
npx tsc --init


npm pkg set scripts.dev="nodemon src/index.ts" scripts.build="tsc" scripts.start="node dist/index.js" 
```

### El tsconfig.json Clave
Debes modificar el archivo generado para que se vea así:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "rootDir": "./src",        // Dónde está tu código TypeScript
    "outDir": "./dist",        // Dónde dejas el JavaScript compilado
    "esModuleInterop": true,   // Permite usar "import express from 'express'"
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

*   **`@types/...`**: Le enseñan a TS qué forma tienen los objetos en Express/Node.
*   **`ts-node-dev`**: Permite correr el servidor TypeScript y reiniciarlo en vivo. Se usa en el `package.json` mediante un script: `"dev": "ts-node-dev src/index.ts"`.

---

## 2. Servidor Base Express

### Arquitectura de Carpetas Ideal
```text
src/
 ├── index.ts          (Levanta el servidor y registra rutas base)
 └── routes/
      ├── index.ts     (Enrutador principal opcional)
      └── monsters.ts  (Lógica específica de un recurso)
```

### Tipado Explícito en Express
Al separar las rutas, es **obligatorio** tipar `Request` (lo que pide el cliente) y `Response` (lo que le respondes):

```typescript
// src/routes/monsters.ts
import { Router, Request, Response } from 'express';

export const router = Router();

// Si no ponemos Request y Response, TS se quejará de "any" implícito
router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Lista de monstruos" });
});
```

### El Índice de Rutas (`routes/index.ts`)
Para no importar 20 archivos distintos en tu servidor principal, creamos un archivo pivote que exporta todo bajo un solo techo:

```typescript
// src/routes/index.ts
// Exportamos el router de cada archivo con un alias (as) para evitar choques de nombres
export { router as healthRouter } from './health';
export { router as monstersRouter } from './monsters';
```

### Levantar el Servidor y Usar los Endpoints (`index.ts`)
Finalmente, en tu servidor base, importas todo desde la carpeta `routes` y unes los enrutadores a la ruta principal usando `app.use()`:

```typescript
// src/index.ts
import express from "express";
import { healthRouter, monstersRouter } from "./routes"; // Importa todo desde routes/index.ts

const app = express();
app.use(express.json()); // Permite recibir JSON en los body
const port = '3000';

// Registramos los endpoints importados
app.use('/health', healthRouter);    // -> Las rutas dentro serán localhost:3000/health/...
app.use('/monsters', monstersRouter);// -> Las rutas dentro serán localhost:3000/monsters/...

// Arrancamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```

---

## 3. Modelado (Interfaces)

Una interfaz define el **molde** de un objeto. 

```typescript
// 1. Interfaz de Entrada (El molde sucio de la API externa)
interface ZeldaAPIResponse {
    data: {
        id: string;
        name: string;
        description: string;
        locations: string[]; // Info variada
    }[];
}

// 2. Interfaz de Salida (El molde limpio que TÚ vas a devolver)
interface MonsterDTO {
    nombre: string;
    descripcion: string;
}

// El proceso mental es: Tomas ZeldaAPIResponse -> Lo mapeas -> Retornas Monster[DTO]
```

---

## 4. Asincronismo y Concurrencia (fetch y Promise.all)

Usar `await` uno por uno en un bucle es un error de concurrencia. Para pedir múltiples URLs al mismo tiempo, usamos `Promise.all`.

### El Código Exacto:

```typescript
// 1. Haces una primera petición (fetch típico) para traer un listado general de cosas pequeñas (ej. URLs de monstruos)
const respuesta = await fetch(urlTodaLaLista);
const datos = (await respuesta.json()) as RootApi;

// Cortamos el arreglo si no queremos hacer demasiadas peticiones (ej. 30 primeros)
const datosRecortados = datos.results.slice(0, 30);

// 2. MAP: Transformamos el arreglo en un "arreglo de promesas" usando fetch.
// MUY IMPORTANTE: NO usamos await aquí, agregamos el .then() directo para extraer el formato JSON
const rutasMonsters = datosRecortados.map(monster => 
    fetch(baseUrl + monster.url).then(r => r.json())
);

// En "rutasMonsters" ahora tienes un arreglo de promesas: [Promise, Promise, Promise...]

// 3. PROMISE.ALL: Dispara todas las tareas a la vez 
// Aquí SÍ va el await (le decímos "pausa hasta que todas las promesas de la mochila se resuelvan")
const datosMonsters = await Promise.all(rutasMonsters) as RootMonsters[];

// datosMonsters ahora es el arreglo con toda la data final ya procesada
```

---

## 5. Manipulación de Arreglos (El Core del Parcial)

```typescript
const numbers = [1, 2, 3, 4, 5];

// 1. .map() -> Transforma cada elemento. Retorna ARRAY NUEVO.
const dobles = numbers.map(num => num * 2); 
// [2, 4, 6, 8, 10]

// 2. .filter() -> Filtra según condición. Retorna ARRAY NUEVO.
const pares = numbers.filter(num => num % 2 === 0); 
// [2, 4]

// 3. .find() -> Busca UN elemento. Retorna EL ELEMENTO o undefined.
const elTres = numbers.find(num => num === 3); 
// 3

// 4. .some() -> ¿Al menos uno cumple? Retorna BOOLEANO.
const hayMayorQueCuatro = numbers.some(num => num > 4); 
// true

// 5. .every() -> ¿Absolutamente todos cumplen? Retorna BOOLEANO.
const todosSonPositivos = numbers.every(num => num > 0); 
// true
```

---

## 6. El Jefe Final: `.reduce()`

Sirve para juntar todo un arreglo en un solo valor acumulado.
Recibe dos cosas: El *callback* `(acumulador, actual)` y el *valorInicial*.

**Ejemplo 1: Sumar valores**
```typescript
const precios = [10, 20, 30];

const total = precios.reduce((acc, precio) => {
    return acc + precio;
}, 0); // 0 es el valor inicial del acc
// Resultado: 60
```

**Ejemplo 2: Agrupar por categorías (Clásico de Parcial)**
```typescript
const items = [
    { type: 'A', name: 'Espada' },
    { type: 'B', name: 'Escudo' },
    { type: 'A', name: 'Arco' }
];

const agrupados = items.reduce((acc: any, item) => {
    // Si la categoría aún no existe, créala como array vacío
    if (!acc[item.type]) {
        acc[item.type] = [];
    }
    // Empuja el elemento actual a su categoría
    acc[item.type].push(item);
    
    return acc; // Siempre retorna el acumulador
}, {}); // {} es el objeto vacío inicial

/* Resultado:
{
  "A": [{ type: 'A', name: 'Espada' }, { type: 'A', name: 'Arco' }],
  "B": [{ type: 'B', name: 'Escudo' }]
}
*/
```

---

## 7. Interactividad con Express (`req.query`)

Cuando capturas parámetros de la URL (`página?limite=5`), Express guarda `"5"` como un string, falseando la matemática.

### La Trampa y la Solución
```typescript
import { Router, Request, Response } from 'express';
const router = Router();

router.get('/monsters', (req: Request, res: Response) => {
    // ❌ MAL: limiteString es "5". Si lo sumas: "5" + 1 = "51"
    const limiteString = req.query.limite; 
    
    // ✅ BIEN: Castear explícitamente a Number
    const limitParams = Number(req.query.limite);
    
    // Validar por si mandan letras (?limite=hola)
    if (isNaN(limitParams)) {
        return res.status(400).json({ error: "El límite debe ser un número" });
    }

    // Ahora puedes usar limitParams de manera correcta
    res.json({ limiteAceptado: limitParams });
});
```

--- 
*¡Éxitos en el parcial! Recuerda: Piensa en el flujo de la información antes de escribir código.*