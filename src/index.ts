import cors from "cors";
import "dotenv/config";
import express from "express";





import { PrismaClient } from "@prisma/client";

import { userRouter } from "./router/users";
import { instrumentRouter } from "./router/instruments";
import { bananeRouter } from "./router/bananes";


import jwt from 'jsonwebtoken';
import { compare } from "bcrypt";

export const prisma = new PrismaClient();


const app = express();



export const monMiddlewareBearer = async (req: any, res: any, next: any) => {
  try{
      const fullToken = req.headers.authorization;
    if (!fullToken) {
        res.status(401).send("No token provided");
    }
    else {

      const [typeToken, token] = fullToken.split(" ");
      if(typeToken !== "Bearer"){
          res.status(401).send("Invalid token type");
      }
      else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if (decoded) {
          req.token = token;
          next();
        }
        else {
          res.status(401).send("Invalid token");
        }
      }
    }
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};



app.use(cors()); 
app.use(express.json());

const apiRouter = express.Router();


apiRouter.use("api/auth", userRouter)
apiRouter.use("/api/instruments", instrumentRouter)
apiRouter.use("/bananes", bananeRouter)

// app.use("/api", apiRouter);

app.use(apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
