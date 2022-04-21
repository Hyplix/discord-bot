const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "colderry",
    run: async (client, message, args) => {
        let user = await client.users.fetch("892091860586217522");

        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(user.username)
                    .setDescription("This guy does too much drama and leaves Discord often.")
                    .setColor(client.color)
                    .addField("Website", "https://colderry.xyz/")
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]
        });
    },
};