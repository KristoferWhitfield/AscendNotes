import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/api/notes", (req, res) => {
  let testNotes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ];
  res.json(testNotes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
