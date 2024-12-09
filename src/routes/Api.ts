import { Router, Request, Response } from "express";

import { personsRouter } from "./Persons";
import { persons } from "../persons";

const router = Router();

router.use("/persons", personsRouter);
router.get("/info", (request: Request, response: Response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
});

export { router as apiRouter };
