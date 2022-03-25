require("dotenv").config();
import { Client } from "./lib";
const client = new Client();

client.on("ready", () => {
    console.log(`${client.user.username} is ready and session: ${client.socket?.session_id}`);
});

client.login(process.env.token);