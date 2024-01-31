import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
export const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? `mongodb+srv://${username}:${password}@cluster0.ctnhzq1.mongodb.net/test-${username}?retryWrites=true&w=majority`
    : `mongodb+srv://${username}:${password}@cluster0.ctnhzq1.mongodb.net/${username}?retryWrites=true&w=majority`;
