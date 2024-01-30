import mongoose from "mongoose";
export const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
