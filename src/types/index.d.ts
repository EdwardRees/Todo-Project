import { Request } from "express";

// Express Custom Types
export interface User {
  user: {
    id: string;
    email: string;
    userId: string;
    username: string;
  };
}

export interface UserRequest extends Request {
  user?: User;
}
