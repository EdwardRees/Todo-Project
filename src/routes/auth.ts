import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Auth } from "@prisma/client";

const authRouter = (prisma: PrismaClient) => {
  const router: Router = Router();

  router.get("/", (req: Request, res: Response) =>
    res.send("Welcome to the auth endpoint!")
  );

  /**
   * Register a new account
   * Create a new account using the credentials passed into the body
   * Check if account already exists, if not, continue
   * Hash password using bcrypt
   * Create user once password hashed
   * Create necessary values in new user
   * Tokenize new user with hash and send to response
   */
  router.post("/register", async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).send({
        error: "Please provide an email, password, and username",
      });
    }
    let user: Auth | null = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).send({ error: "User already exists" });
    }
    user = await prisma.auth.findUnique({ where: { username: username } });
    if (user) {
      return res.status(400).send({ error: "Username already in use!" });
    }

    let hash = bcrypt.hashSync(password, 10);

    await prisma.user
      .create({
        data: {
          auth: {
            create: {
              username: username,
              email: email,
              password: hash,
            },
          },
          lists: {
            create: [],
          },
          items: {
            create: [],
          },
        },
      })
      .then((user) => {
        const accessToken: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;
        const token = jwt.sign({ user }, accessToken);

        res.send({ user, token });
      });
  });

  router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Please provide an email and password" });
    }

    await prisma.auth
      .findUnique({
        where: {
          email: email,
        },
      })
      .then((user: Auth | null) => {
        if (!user) {
          return res.status(404).send({ error: "User does not exist" });
        }

        const validPassword: boolean = bcrypt.compareSync(
          password,
          user.password
        );
        if (!validPassword) {
          return res.status(400).send({ error: "Invalid password" });
        }

        const accessToken: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

        const token = jwt.sign({ user }, accessToken);

        res.send({ user, token });
      });
  });

  return router;
};

export default authRouter;
