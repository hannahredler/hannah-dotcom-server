import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

// use a request type instead?
export const validateBody =
  (params: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const missingParams: string[] = [];
    params.forEach((param) => {
      if (!req.body[param]) missingParams.push(param);
    });
    if (missingParams.length === 0) next();
    else
      return res
        .status(400)
        .send(`Required fields missing: ${missingParams.join(", ")}`);
  };

export const parseBodyAsJson = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send("Invalid request body. Cannot parse Json");
    }
    next();
  });
};
