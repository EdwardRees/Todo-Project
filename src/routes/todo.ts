import { PrismaClient, User } from "@prisma/client";
import { Request, Response, Router } from "express";
import verify from "../middleware/verify";
import { UserRequest } from "../types";

const todoRouter = (prisma: PrismaClient) => {
  const router: Router = Router();

  router.get("/", async (req: Request, res: Response) => {
    return res.send("Todo endpoint");
  });

  router.get("/all", async (req: Request, res: Response) => {
    let todos = await prisma.todoItem.findMany();
    return res.send(todos);
  });

  router.post("/create", [verify], async (req: UserRequest, res: Response) => {
    const user = req.user?.user;
    const userId = user?.userId;
    if (!userId) {
      console.error("User not found!");
      return res.status(401).send({ error: "User not found" });
    }
    const { name, desc, listId } = req.body;
    if (!name || !desc || !listId) {
      console.error("Missing parameters");
      return res
        .status(400)
        .send({ error: "Name, description, and listId required" });
    }
    let item = await prisma.todoItem.create({
      data: {
        name,
        desc,
        list: {
          connect: {
            id: listId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.send(item);
  });

  router.get("/user", [verify], async (req: UserRequest, res: Response) => {
    const userId = req.user?.user.userId;
    if (!userId) {
      console.error("Cannot get user todo items, no user found");
      return res.status(401).send({ error: "User not found" });
    }
    let todoItems = await prisma.todoItem.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
    res.send(todoItems);
  });

  router.get("/get/:id", [verify], async (req: UserRequest, res: Response) => {
    const userId = req.user?.user.userId;
    if (!userId) {
      console.error("Cannot get specified user todo item, no user provided");
      return res.status(401).send({ error: "User not found" });
    }
    const { id } = req.params;
    let item = await prisma.todoItem.findMany({
      where: {
        id: id,
        user: {
          id: userId,
        },
      },
    });
    if (item.length === 0) {
      return res.status(404).send({ error: "Todo item not found" });
    }
    res.send(item[0]);
  });

  router.put(
    "/update/:id",
    [verify],
    async (req: UserRequest, res: Response) => {
      const userId = req.user?.user.userId;
      if (!userId) {
        console.error(
          "Cannot update specific user todo item, no user provided"
        );
        return res.status(401).send({ error: "User not found" });
      }
      const { id } = req.params;
      const { name, desc, listId } = req.body;
      if (!name || !desc || !listId) {
        console.error("Missing parameters");
        return res
          .status(400)
          .send({ error: "Name, description, and listId required" });
      }
      let item = await prisma.todoItem.update({
        where: {
          id: id,
        },
        data: {
          name,
          desc,
          list: {
            connect: {
              id: listId,
            },
          },
        },
      });
      res.send(item);
    }
  );

  router.put(
    "/complete/:id",
    [verify],
    async (req: UserRequest, res: Response) => {
      const userId = req.user?.user.userId;
      if (!userId) {
        console.error("Cannot mark todo as complete, missing user id");
        return res.status(401).send({ error: "User not found" });
      }
      const { id } = req.params;
      let item = await prisma.todoItem.update({
        where: {
          id: id,
        },
        data: {
          completed: true,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return res.send(item);
    }
  );
  router.put(
    "/incomplete/:id",
    [verify],
    async (req: UserRequest, res: Response) => {
      const userId = req.user?.user.userId;
      if (!userId) {
        console.error("Cannot mark todo as complete, missing user id");
        return res.status(401).send({ error: "User not found" });
      }
      const { id } = req.params;
      let item = await prisma.todoItem.update({
        where: {
          id: id,
        },
        data: {
          completed: false,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return res.send(item);
    }
  );

  /**
   * Get all completed todos
   */
  router.get(
    "/user/completed",
    [verify],
    async (req: UserRequest, res: Response) => {
      const userId = req.user?.user.userId;
      if (!userId) {
        console.error("Cannot get user's completed items, missing user id");
        return res.status(401).send({ error: "User not found" });
      }
      let items = await prisma.todoItem.findMany({
        where: {
          userId: userId,
          completed: true,
        },
      });
      res.send(items);
    }
  );

  router.delete("/:id", [verify], async (req: UserRequest, res: Response) => {
    const userId = req.user?.user.userId;
    if (!userId) {
      console.error("Cannot delete item, missing user id");
      return res.status(401).send({ error: "User not found" });
    }
    const { id } = req.params;
    let item = await prisma.todoItem.delete({
      where: {
        id: id,
      },
    });
    return res.send(item);
  });

  return router;
};

export default todoRouter;
