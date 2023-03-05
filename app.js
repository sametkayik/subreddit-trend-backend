import express from "express";
import { getSubreddit } from "./controllers/subredditController.js";

const app = express();
const port = 3000;

app.get("/r/:subreddit", getSubreddit);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
