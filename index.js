import { config } from "dotenv";
import Server from "./configs/server.js";
import { handleChatConnection } from "./chat/src/controller/chat.controller.js";

config();
const server = new Server();
handleChatConnection(server.io);
server.listen();
