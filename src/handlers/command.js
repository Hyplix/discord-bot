const { sync } = require("glob");
const { resolve } = require("path");

module.exports = (client) => {
    let files = sync("./src/commands/**/*.js");

    for (let i = 0; i < files.length; i++) {
        let command = require(resolve(files[i]));
        
        if (command.name) {
            client.commands.set(command.name, command);
        };
    };
};