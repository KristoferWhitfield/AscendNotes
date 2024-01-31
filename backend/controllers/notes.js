import express from "express";
import { Note } from "../models/note.js";

const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.post("/", (req, res, next) => {
  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
  });
  note
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

export default notesRouter;
