import "dotenv/config";
import express from "express";
import { getNowPlaying } from "./vk.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const text = await getNowPlaying();
  res.send(text);
});

app.get("/ping", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log("Server started");
});
