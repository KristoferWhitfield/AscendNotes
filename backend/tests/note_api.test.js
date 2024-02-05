import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";

const api = supertest(app);
let notes = {
  content: "HTML is somewhat easy",
  important: false,
};

beforeEach(() => {
  notes = {
    content: "HTML is somewhat easy",
    important: false,
  };
});

describe("GET /api/notes", () => {
  it("responds with json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((res) => {
        console.log(res.body.length);
      });
  });
});

describe("POST /api/notes", () => {
  it("responds with json", async () => {
    await api
      .post("/api/notes")
      .send(notes)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });

  describe("error handling", () => {
    it("returns an error when posting an incomplete note", async () => {
      delete notes.content;
      await api
        .post("/api/notes")
        .send(notes)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect({
          error: "Note validation failed: content: Path `content` is required.",
        });
    });
  });
});

describe("PUT /api/notes/:id", () => {
  const newNote = {
    content: "HTML is somewhat easy",
    important: false,
  };
  it("updates the identified note and returns the updated note with the same id", async () => {
    await api
      .post("/api/notes")
      .send(newNote)
      .then((res) => (newNote.id = res.body.id));

    await api
      .put(`/api/notes/${newNote.id}`)
      .send({ content: "Update note", important: true })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        console.log(newNote.id, "new note id");
        expect(newNote.id).toEqual(res.body.id);
        expect(newNote.content).not.toEqual(res.body.content);
        expect(newNote.important).not.toEqual(res.body.important);
      });
  });

  describe("error handling", () => {
    it("returns an error when uploading to a nonexistent id in the database", async () => {
      await api
        .post("/api/notes/65c13ff3de22ff419caffd95")
        .send(notes)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .expect({ error: "unknown endpoint" });
    });
  });
});

describe("DELETE /api/notes/:id", () => {
  const note = {
    content: "HTML is somewhat easy",
    important: false,
  };
  it("deletes the document", async () => {
    await api
      .post("/api/notes")
      .send(note)
      .then((res) => (note.id = res.body.id));

    await api.delete(`/api/notes/${note.id}`).expect(204);
  });

  describe("error handling", () => {
    it("returns an error when deleting to a nonexistent id in the database", async () => {
      await api
        .delete("/api/notes/65c13ff3de22ff419caffd95")
        .send(notes)
        .set("Accept", "application/json")
        .expect(204);
    });
  });
});

afterAll(async () => {
  await api.delete("/api/notes/all/delete");
  await mongoose.connection.close();
});
