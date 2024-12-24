import { Router, Request, Response } from "express";

import { personsRouter } from "./Persons";
import { Person } from "../models/person";

const router = Router();

router.use("/persons", personsRouter);
router.get("/info", (request: Request, response: Response) => {
  Person.countDocuments({})
    .then((count) => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(() => {
      response.status(503).send("Service Unavailable");
    });
});

export { router as apiRouter };
