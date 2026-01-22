import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
  }

  return socket;
};
