import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../types";
import verify from "../middleware/verify";

const userRouter = (prisma: PrismaClient) => {
  const router: Router = Router();

  router.get("/", async (req, res) => {
    return res.send("User endpoint");
  });

  router.get("/all", async (req, res) => {
    let users = await prisma.user.findMany();
    return res.send(users);
  });

  router.get("/get", [verify], async (req: UserRequest, res: Response) => {
    let user = await prisma.user.findUnique({
      where: {
        id: req.user?.user.userId,
      },
    });
    return res.send(user);
  })

  router.post("/list", [verify], async (req: UserRequest, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.user.userId;
    if(!userId){
      console.error("User not found!");
      return  res.status(401).send({ error: "User not found" });
    }
    await prisma.todoList
      .create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          name: name,
        },
      })
      .then((list) => res.send(list))
      .catch((err) => res.status(500).send(err.message));
  });

  router.get("/lists", [verify], async (req: UserRequest, res: Response) => {
    const userId  = req.user?.user.userId;
    if(!userId){
      console.error("User not found!");
      return  res.status(401).send({ error: "User not found" });
    }
    await prisma.todoList
      .findMany({
        where: {
          userId: userId,
        },
      })
      .then((lists) => res.send(lists))
      .catch((err) => res.status(500).send(err));
  });

  return router;
};

export default userRouter;
