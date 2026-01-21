import {
  ClientToServerEvents,
  Problem,
  ServerToClientEvents,
} from "@/lib/types";
import { generateProblems } from "@/lib/utils";

import { createServer } from "http";
import { Server } from "socket.io";

const problems: Problem[] = generateProblems(1);
let currentProblemId = problems[0]?.id || undefined;

const httpServer = createServer();
const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("problems", problems);
  const currentProblem = problems.find((p) => p.id === currentProblemId);
  if (currentProblem) {
    socket.emit("problem", currentProblem);
  }

  socket.on("problems", () => {
    socket.emit("problems", problems);
  });

  socket.on("problem", (nextProblem) => {
    if (!nextProblem) {
      return;
    }

    currentProblemId = nextProblem?.id;
    const index = problems.findIndex((p) => p.id === currentProblemId);
    if (index !== -1) {
      problems[index] = nextProblem;
    }
    io.emit("problem", nextProblem);
    io.emit("problems", problems);
  });

  socket.on("create", (newProblem) => {
    problems.push(newProblem);
    io.emit("create", newProblem);
    io.emit("problem", newProblem);
    io.emit("problems", problems);
  });

  socket.on("delete", (id) => {
    const index = problems.findIndex((p) => p.id === id);
    if (index !== -1) {
      problems.splice(index, 1);
      io.emit("delete", id);
      io.emit("problems", problems);

      if (problems.length > 0) {
        const newCurrentProblem = problems[0];
        currentProblemId = newCurrentProblem.id;
        console.log(currentProblemId);
        io.emit("problem", newCurrentProblem);
      } else {
        currentProblemId = undefined;
        io.emit("problem", undefined);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
