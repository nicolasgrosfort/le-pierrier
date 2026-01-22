import { DEFAULT_DATA } from "@/lib/config";
import { ClientToServerEvents, Db, ServerToClientEvents } from "@/lib/types";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { JSONFilePreset } from "lowdb/node";
import { Server } from "socket.io";

const db = await JSONFilePreset<Db>("src/db/db.json", DEFAULT_DATA);
const app = express();
const httpServer = createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://pierrier.panstructure.ch",
    ],
    credentials: true,
  },
});

app.use(express.static("dist"));

app.get("/", (_, res) => {
  res.sendFile("dist/index.html");
});

app.get("/wall", (_, res) => {
  res.sendFile("dist/wall/index.html");
});

io.use((socket, next) => {
  const key = socket.handshake.auth?.key;

  if (!key) {
    return next(new Error("Missing auth key"));
  }

  if (key !== process.env.SOCKET_KEY) {
    return next(new Error("Invalid auth key"));
  }

  socket.data.key = key;

  next();
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("holds", db.data.holds);
  socket.emit("problems", db.data.problems);
  socket.emit("transform", db.data.transform);

  const currentProblem = db.data.problems.find(
    (p) => p.id === db.data.currentProblemId,
  );
  if (currentProblem) {
    socket.emit("problem", currentProblem);
  }

  socket.on("problems", () => {
    socket.emit("problems", db.data.problems);
  });

  socket.on("transform", (transform) => {
    db.data.transform = transform;
    db.write();

    io.emit("transform", transform);
  });

  socket.on("problem", (nextProblem) => {
    if (!nextProblem) {
      return;
    }

    db.data.currentProblemId = nextProblem?.id;
    db.write();

    const index = db.data.problems.findIndex(
      (p) => p.id === db.data.currentProblemId,
    );

    if (index !== -1) {
      db.data.problems[index] = nextProblem;
      db.write();
    }

    io.emit("problem", nextProblem);
    io.emit("problems", db.data.problems);
  });

  socket.on("create", (newProblem) => {
    db.data.problems.push(newProblem);
    db.data.currentProblemId = newProblem.id;
    db.write();

    io.emit("create", newProblem);
    io.emit("problem", newProblem);
    io.emit("problems", db.data.problems);
  });

  socket.on("delete", (id) => {
    const index = db.data.problems.findIndex((p) => p.id === id);
    if (index !== -1) {
      db.data.problems.splice(index, 1);
      db.write();

      io.emit("delete", id);
      io.emit("problems", db.data.problems);

      if (db.data.problems.length > 0) {
        const newCurrentProblem = db.data.problems[0];
        db.data.currentProblemId = newCurrentProblem.id;
        io.emit("problem", newCurrentProblem);
      } else {
        db.data.currentProblemId = undefined;
        io.emit("problem", undefined);
      }

      db.write();
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3000, "0.0.0.0", () => {
  console.log("Server (HTTP + Socket.IO) running on port 3000");
});
