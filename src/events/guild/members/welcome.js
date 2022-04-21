module.exports = {
    name: "guildMemberAdd",
    exec: (client, member) => {
        if (member.user.bot) return;
        const channel = client.channels.cache.get(client.server.channel.welcome);

        if (channel) {
            channel.send(`Hey <@!${member.user.id}> :wave: Welcome to ${member.guild.name}!\n- I hope you enjoy your time here :)`)
        };
    },
};