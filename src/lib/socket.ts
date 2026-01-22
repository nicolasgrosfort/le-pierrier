import { ClientToServerEvents, ServerToClientEvents } from "@/lib/types";
import { getKeyFromUrl } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = () => {
  if (!socket) {
    const key = getKeyFromUrl();

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        key: key ?? "client",
      },
    });
  }

  return socket;
};
