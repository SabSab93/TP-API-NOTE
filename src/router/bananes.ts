import { Router } from "express";
import { PrismaClient } from "@prisma/client";


export const bananeRouter = Router();
const prisma = new PrismaClient();


bananeRouter.get('http://localhost:1992/bananes?couleur', async function(req, res) {
  let couleur = req.query.couleur;
 if (couleur==="jaune"){
  res.status(202).json({ message: `"couleur":"jaune "prix":2.5` });
 }else {
  res.status(202).json({ message: `"couleur":"null "prix":2.5` });
 }
  });
