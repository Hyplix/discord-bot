module.exports = {
    name: "ready",
    exec: (client) => {
        console.log(`${client.user?.username} is now online`);
    },
};