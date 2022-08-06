import { Request, Response } from "express";
export const hello = (req: Request, res: Response) => {
  res.send("Hello World from api!");
};

export const test = (req: Request, res: Response) => {
  res.send("Tests is the dev's best friend!");
};

export const alpha = (req: Request, res: Response) => {
  res.send("abcdefghijklmnopqrstuvwxyz!");
};

export const error = (req: Request, res: Response) => {
  res.send("Oops, something goes wrong!");
};
