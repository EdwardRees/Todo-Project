import { Application } from "express";
import { PrismaClient } from "@prisma/client";
import authRouter from "./auth";
import listRouter from './list';
import todoRouter from './todo';
import userRouter from './user';

export default (app: Application, prisma: PrismaClient) => {
  app.use("/api/auth", authRouter(prisma));
  app.use("/api/list", listRouter(prisma));
  app.use("/api/todo", todoRouter(prisma));
  app.use("/api/user", userRouter(prisma));
};
