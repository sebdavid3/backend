import express, { response, Router } from "express";
export const router = Router();

router.get('/', (req,res)=>{
  res.json({"estado": "API funcionando al 100%"});
})