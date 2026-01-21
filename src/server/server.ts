import { ClientToServerEvents, Db, ServerToClientEvents } from "@/lib/types";
import { createServer } from "http";
import { JSONFilePreset } from "lowdb/node";
import { Server } from "socket.io";

const defaultData: Db = { problems: [], currentProblemId: undefined };
const db = await JSONFilePreset<Db>("src/db/db.json", defaultData);

const httpServer = createServer();
const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("problems", db.data.problems);
  const currentProblem = db.data.problems.find(
    (p) => p.id === db.data.currentProblemId,
  );
  if (currentProblem) {
    socket.emit("problem", currentProblem);
  }

  socket.on("problems", () => {
    socket.emit("problems", db.data.problems);
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

httpServer.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
