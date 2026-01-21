// server.js
import {
  ClientToServerEvents,
  Problem,
  ServerToClientEvents,
} from "@/lib/types";
import { generateProblems } from "@/lib/utils";
import { createServer } from "http";
import { Server } from "socket.io";

const problems: Problem[] = generateProblems(100);
let currentProblemIndex = 0;

const httpServer = createServer();
const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("current", currentProblemIndex);
  socket.emit("problems", problems);
  socket.emit("problem", problems[currentProblemIndex]);

  socket.on("current", (nextProblemIndex) => {
    currentProblemIndex = nextProblemIndex;
    io.emit("current", nextProblemIndex);
  });

  socket.on("problems", () => {
    socket.emit("problems", problems);
  });

  socket.on("problem", (nextProblem) => {
    problems[nextProblem.id - 1] = nextProblem;
    io.emit("problem", nextProblem);
  });

  // socket.emit("current", problems[currentProblemIndex]);
  // socket.emit("problems", problems);

  // socket.on("current", (updatedProblem) => {
  //   problems[currentProblemIndex] = updatedProblem;
  //   io.emit("current", updatedProblem);
  // });

  // socket.on("selectProblem", (index) => {
  //   if (index >= 0 && index < problems.length) {
  //     currentProblemIndex = index;
  //     io.emit("current", problems[currentProblemIndex]);
  //   }
  // });

  // socket.on("addProblem", (newProblem) => {
  //   problems.push(newProblem);
  //   io.emit("problems", problems);
  // });

  // socket.on("deleteProblem", (index) => {
  //   if (index >= 0 && index < problems.length) {
  //     problems.splice(index, 1);
  //     if (currentProblemIndex >= problems.length) {
  //       currentProblemIndex = Math.max(0, problems.length - 1);
  //     }
  //     io.emit("problems", problems);
  //     io.emit("current", problems[currentProblemIndex]);
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
