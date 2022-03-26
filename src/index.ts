require("dotenv").config();
import { Client } from "./lib";
const client = new Client();

import loadCommands from "./commands/loadCommands";

client.on("ready", () => {
    console.log(`${client.user.username} is ready and session: ${client.socket?.session_id}`);

    loadCommands(client);
});

client.login(process.env.token);