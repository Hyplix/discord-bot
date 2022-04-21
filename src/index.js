require("dotenv").config();
const Hyplix = require("./structs/client");
const client = new Hyplix({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: {
        parse: ["users"]
    }
});

["event", "command"].forEach(
    (file) => require(`./handlers/${file}`)(client)
);

client.login(process.env.HyplixToken);