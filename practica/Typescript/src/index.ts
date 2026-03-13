const url = 'https://www.dnd5eapi.co/api/2014/monsters'

import express from "express"
import { healthRouter, monstersRouter } from "./routes";
const app = express();
app.use(express.json());
const port = '3000';

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/', (req,res)=>{
    res.send('Hola mundo');
})

app.use('/health',healthRouter);
app.use('/monsters',monstersRouter);