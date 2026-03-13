import express, { Request, Response } from "express";
import { PokeRouter } from "./routes";
const app = express();
const PORT = "3000";
app.use(express.json());

app.listen(PORT, ()=>{
    console.log("Hola");
})

app.get("/", (req: Request, res: Response)=>{
    res.json("mensaje: Hola")
})

app.use("/pokemon", PokeRouter)