const { Message } = require("discord.js");

const prefix = "h!";
module.exports = {
    name: "messageCreate",
    /**
     * @param {*} client 
     * @param {Message} message
     */
    exec: (client, message) => {
        if (message.author.bot) return;
        if (message.channel.type === "DM") return;

        if (message.content.startsWith(prefix)) {

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = client.commands.get(args.shift()?.toLowerCase());

            if (cmd) cmd.run(client, message, args);
        };
    },
};