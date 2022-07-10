import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import routes from './routes';

const app: Application = express();
const PORT: string | number = process.env.PORT || 5500;

const prisma: PrismaClient = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req: Request, res: Response) => res.send(`Welcome to the Todo List`));

routes(app, prisma);

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
