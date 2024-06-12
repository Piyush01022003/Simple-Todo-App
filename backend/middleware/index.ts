import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application
import {Request, Response, NextFunction} from 'express';
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, payload) => {   //we dont need to write token: string or err: Error because jwt already have that interface
      if (err) {
        return res.sendStatus(403);
      }
      // we know payload can be only undefined | string | JwtPayload;
      if(payload==undefined){
        return res.sendStatus(403);
      }
      if(typeof payload === "string"){
        return res.sendStatus(403);
      }

      req.headers["userId"] = payload.id;   //req.userId=user.id (passing id to subsequent functions)
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


