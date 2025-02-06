import { Router } from "express";
import { PrismaClient } from "@prisma/client";


export const bananeRouter = Router();
const prisma = new PrismaClient();


// POST
bananeRouter.post('/', async (req, res) => {
  const banane = await prisma.banane.create({
    data : {
      couleur:req.body.data.couleur,
      prix:req.body.data.prix,
    }
  });
  res.status(201).json(banane);
})



// GET
bananeRouter.get("/?couleur={couleur}", async (req, res) => {
  const bananes = await prisma.banane.findMany();
  res.json(bananes);
})

