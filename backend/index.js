import express from "express";
import { Note, mongoose } from "./utils/config.js";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
    mongoose.connection.close();
    return result;
  });
});

app.post("/api/note", (req, res) => {
  const note = new Note({
    content: req.body.content,
    important: req.body.important,
  });
  note.save().then((result) => {
    res.json(result);
    mongoose.connection.close();
    return result;
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
