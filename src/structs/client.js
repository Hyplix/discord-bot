const { Client, Collection } = require("discord.js");

module.exports = class extends Client {
    constructor (options) {
        super(options);

        this.commands = new Collection();
        this.color = 5351140;
        this.server = require("../server.json");
    };
};