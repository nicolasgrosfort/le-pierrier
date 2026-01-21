import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://192.168.1.206:3001", {
      autoConnect: false,
    });
  }
  return socket;
};
