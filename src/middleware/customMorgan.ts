import { Request, Response } from "express";
import morgan, { TokenIndexer } from "morgan";

morgan.token("body", (req: Request) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

const customMorganFormat = (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
) => {
  const logParts = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens["body"](req, res),
  ];
  return logParts.join(" ");
};
const customMorgan = morgan(customMorganFormat);

export { customMorgan };
