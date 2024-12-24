import { NextFunction, Request, Response } from "express";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "CastError") {
    res.status(400).send({ error: "Invalid ID format" });
    return;
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err.stack);
  next(err);
  return;
}

export default errorHandler;
