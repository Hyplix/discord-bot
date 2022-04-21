module.exports = {
    name: "ping",
    run: (client, message, args) => {
        return message.reply(`Pong! \`${Date.now() - message.createdTimestamp}ms\``)
    },
};