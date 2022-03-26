import { Message } from "../lib/structs/Message";
import { Client } from "../lib";

import fs from "fs";
import fetch from "node-fetch";

function loadCommands (client: Client) {

    const dir = fs.readdirSync(__dirname + "/core").filter(ext => ext.endsWith(".js"));
    
    for (let i = 0; i < dir.length; i++) {
        const file = require(`./core/${dir[i]}`).default;
        
        if (file.name) {
            client.commands.set(file.name, file);
        };
    };

    client.on("guildMessage", (message) => handleCommands(client, message));
};

async function handleCommands (client: Client, message: Message) {
    const author = await fetch(`https://discord.com/api/v10/users/${message.author?.id}`, {
        method: "GET",
        headers: { "Authorization": `Bot ${client.token}` }
    }).then((res) => res.json());

    if (author.bot) return;
    const prefix = "h!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.get(String(args.shift()?.toLowerCase()));

    if (command) {
        return command.run(message, args);
    };
};

export default loadCommands;