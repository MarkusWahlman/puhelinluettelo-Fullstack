import { Router, Request, Response } from "express";
import { persons } from "../persons";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json(persons);
});

router.post("/", (request: Request, response: Response) => {
  const newPerson = request.body;
  const newName = newPerson.name;
  const newNumber = newPerson.number;

  if (!newName || !newNumber) {
    response.status(400).json({ error: "Invalid request" });
    return;
  }

  const notUniqueName = persons.some((person) => {
    return person.name == newName;
  });
  if (notUniqueName) {
    response.status(400).json({ error: "Name must be unique" });
    return;
  }

  persons.push({
    id: Math.floor(Math.random() * 1_000_000_000_000).toString(),
    name: newName,
    number: newNumber,
  });

  response.json("Contact created successfully");
});

router.get("/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    response.status(404).json({ error: "Contact not found" });
    return;
  }

  response.json(person);
});

router.delete("/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const personIndex = persons.findIndex((person) => person.id === id);
  if (personIndex === -1) {
    response.status(404).json({ error: "Contact not found" });
    return;
  }
  const removedPerson = persons.splice(personIndex, 1);
  response.json({
    message: "Contact deleted successfully",
    removed: removedPerson[0],
  });
});

export { router as personsRouter };
