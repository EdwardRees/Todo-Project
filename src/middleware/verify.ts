import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


export default (req: any, res: Response, next: NextFunction) => {
  if(req.headers['x-auth-token']){
    const token = req.headers['x-auth-token'];
    try {
      const secret: Secret = process.env.JWT_SECRET as Secret;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch(e){
      res.status(401).send({
        error: "Invalid token"
      });
    }
  } else {
    res.status(401).send({
      error: "No token provided"
    });
  }
}