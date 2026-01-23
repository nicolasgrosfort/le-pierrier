import {
  DEFAULT_DB_CONFIG,
  DEFAULT_DB_HOLDS,
  DEFAULT_DB_PROBLEMS,
} from "@/lib/config";
import {
  ClientToServerEvents,
  DbConfig,
  DbHolds,
  DbProblems,
  ServerToClientEvents,
} from "@/lib/types";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { JSONFilePreset } from "lowdb/node";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

const problems = await JSONFilePreset<DbProblems>(
  "db/problems.json",
  DEFAULT_DB_PROBLEMS,
);

const config = await JSONFilePreset<DbConfig>(
  "db/config.json",
  DEFAULT_DB_CONFIG,
);

const holds = await JSONFilePreset<DbHolds>("db/holds.json", DEFAULT_DB_HOLDS);

const app = express();
const httpServer = createServer(app);

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://pierrier.panstructure.ch"]
    : ["http://localhost:3000", "http://localhost:3001"];

const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(express.static("dist"));

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

app.get("/wall", (_, res) => {
  res.sendFile(join(__dirname, "../wall/index.html"));
});

app.get("/editor", (_, res) => {
  res.sendFile(join(__dirname, "../wall/editor.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const currentProblem = problems.data.problems.find(
    (p) => p.id === problems.data.currentProblemId,
  );

  socket.emit("holds", holds.data);
  socket.emit("problems", problems.data.problems);
  socket.emit("transform", config.data.transform);

  if (currentProblem) socket.emit("problem", currentProblem);

  socket.on("addHold", (newHold) => {
    holds.data.push(newHold);
    holds.write();

    io.emit("addHold", newHold);
    io.emit("holds", holds.data);
  });

  socket.on("updateHold", (hold) => {
    const index = holds.data.findIndex((h) => h.id === hold.id);
    if (index !== -1) {
      holds.data[index] = hold;
      holds.write();

      io.emit("holds", holds.data);
    }
  });

  socket.on("deleteHold", (holdId) => {
    const index = holds.data.findIndex((h) => h.id === holdId);
    if (index !== -1) {
      holds.data.splice(index, 1);
      holds.write();

      io.emit("holds", holds.data);
    }
  });

  socket.on("transform", (transform) => {
    config.data.transform = transform;
    config.write();

    io.emit("transform", transform);
  });

  socket.on("problem", (nextProblem) => {
    if (!nextProblem) return;

    problems.data.currentProblemId = nextProblem?.id;
    problems.write();

    const index = problems.data.problems.findIndex(
      (p) => p.id === problems.data.currentProblemId,
    );

    if (index !== -1) {
      problems.data.problems[index] = nextProblem;
      problems.write();
    }

    io.emit("problem", nextProblem);
    io.emit("problems", problems.data.problems);
  });

  socket.on("create", (newProblem) => {
    problems.data.problems.push(newProblem);
    problems.data.currentProblemId = newProblem.id;
    problems.write();

    io.emit("create", newProblem);
    io.emit("problem", newProblem);
    io.emit("problems", problems.data.problems);
  });

  socket.on("delete", (id) => {
    const index = problems.data.problems.findIndex((p) => p.id === id);

    if (index !== -1) {
      problems.data.problems.splice(index, 1);
      problems.write();

      io.emit("delete", id);
      io.emit("problems", problems.data.problems);

      if (problems.data.problems.length > 0) {
        const newCurrentProblem = problems.data.problems[0];
        problems.data.currentProblemId = newCurrentProblem.id;
        io.emit("problem", newCurrentProblem);
      } else {
        problems.data.currentProblemId = undefined;
        io.emit("problem", undefined);
      }

      problems.write();
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server (HTTP + Socket.IO) running on port ${port}`);
});
