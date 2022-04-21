require("dotenv").config();
const Hyplix = require("./structs/client");
const client = new Hyplix({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: {
        repliedUser: false
    }
});

["event", "command"].forEach(
    (file) => require(`./handlers/${file}`)(client)
);

client.login(process.env.HyplixToken);