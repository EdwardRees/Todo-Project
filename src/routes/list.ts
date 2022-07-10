import { Router, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import verify from "../middleware/verify";
import { UserRequest } from "../types/";

const listRouter = (prisma: PrismaClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    return res.send("List endpoint");
  });

  router.get("/all", async (req: Request, res: Response) => {
    let lists = await prisma.todoList.findMany();
    return res.send(lists);
  });

  router.post("/create", [verify], async (req: UserRequest, res: Response) => {
    const user = req.user?.user;
    const userId = user?.userId;
    if (!userId) {
      console.error("Cannot create list, no user id");
      return res.status(401).send({ error: "User not found" });
    }
    const { name } = req.body;
    if (!name) {
      console.error("No name provided");
      return res.status(400).send({ error: "No name provided" });
    }
    let list = await prisma.todoList.create({
      data: {
        name,
        items: {
          create: [],
        },
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    });
    res.send(list);
  });

  router.get("/user", [verify], async (req: UserRequest, res: Response) => {
    const user = req.user?.user;
    const userId = user?.userId;
    if (!userId) {
      console.error("Cannot get all lists from user, no user id");
      return res.status(401).send({ error: "User not found" });
    }
    let lists = await prisma.todoList.findMany({
      where: {
        user: {
          id: parseInt(userId),
        },
      },
    });
    res.send(lists);
  });

  router.get("/:listId", [verify], async (req: UserRequest, res: Response) => {
    const userId = req.user?.user.userId;
    if (!userId) {
      console.error("Cannot get items from list, missing user id");
      return res.status(401).send({ error: "User not found" });
    }
    const { listId } = req.params;
    let items = await prisma.todoItem.findMany({
      where: {
        listId: parseInt(listId),
      },
    });
    res.send(items);
  });

  return router;
};

export default listRouter;
