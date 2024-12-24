import { Router, Request, Response, NextFunction } from "express";
import { Person } from "../models/person";

const router = Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (request: Request, response: Response, next: NextFunction) => {
  const requestBody = request.body;
  const newName = requestBody.name;
  const newNumber = requestBody.number;

  if (!newName || !newNumber) {
    response.status(400).json({ error: "Invalid request" });
    return;
  }

  Person.findOne({ name: newName })
    .then((existingPerson) => {
      if (existingPerson) {
        response.status(400).json({ error: "Name must be unique" });
        return;
      }

      const newPerson = new Person({ name: newName, number: newNumber });
      return newPerson.save();
    })
    .then((savedPerson) => {
      if (savedPerson) {
        response.json(savedPerson);
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    Person.findById(id)
      .then((person) => {
        if (!person) {
          response.status(404).json({ error: "Contact not found" });
          return;
        }

        response.json(person);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.delete(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
      .then((removedPerson) => {
        if (!removedPerson) {
          response.status(404).json({ error: "Contact not found" });
          return;
        }

        response.json({
          message: "Contact deleted successfully",
          removed: removedPerson,
        });
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.put(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const { name: newName, number: newNumber } = request.body;

    const newPerson: Person = { name: newName, number: newNumber };

    if (!newName || !newNumber) {
      response.status(400).json({ error: "Invalid request" });
      return;
    }

    Person.findByIdAndUpdate(id, newPerson, { new: true })
      .then((updatedPerson) => {
        if (!updatedPerson) {
          response.status(404).json({ error: "Contact not found" });
          return;
        }
        response.json(updatedPerson);
      })
      .catch((error) => {
        next(error);
      });
  }
);

export { router as personsRouter };
