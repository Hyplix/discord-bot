const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "jddev",
    run: async (client, message, args) => {
        let user = await client.users.fetch("419958345487745035");

        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(user.username)
                    .setDescription("This guy is not so cool but supports colderry :)")
                    .setColor(client.color)
                    .addField("Website", "https://jaydoesdev.com/")
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]
        });
    },
};