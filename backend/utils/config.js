import mongoose from "mongoose";
import dotenv from "dotenv";
import { noteSchema } from "../models/note.js";

dotenv.config();

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const url = `mongodb+srv://${username}:${password}@cluster0.ctnhzq1.mongodb.net/${username}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const Note = mongoose.model("Note", noteSchema);

export { Note, mongoose };
