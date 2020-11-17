import express from "express";
import http from "http";
import path from "path";

const app = express();

const server = http.createServer(app);

app.use("/", express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

server.listen(7000, () => console.log("listening"));
