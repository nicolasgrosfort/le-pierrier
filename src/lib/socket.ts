import { IP_ADDRESS } from "@/lib/config";
import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = () => {
  if (!socket) {
    socket = io(`http://${IP_ADDRESS}:3001`, {
      autoConnect: false,
    });
  }
  return socket;
};
