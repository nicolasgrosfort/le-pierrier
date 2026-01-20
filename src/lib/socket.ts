import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001", {
      autoConnect: false,
    });
  }
  return socket;
};
