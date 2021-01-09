const Discord = require("discord.js");
const {consoleExecutedCommands, prefix, deleteDelay} = require("../config.json");

module.exports = {

    name: "random",
    description: "Returns a random number between two specified numbers",
    execute(message, args) {

        if(args.length != 2 || isNaN(args[0]) || isNaN(args[1])) {

            let Embed = new Discord.MessageEmbed()
                .setColor("#0099FF")
                .setTitle("How to use the __random__ command:")
                .setDescription(`${prefix}random **min max**`)
            message.channel.send(Embed);
        } else {

            min = parseInt(args[0], 10);
            max = parseInt(args[1], 10);

            if(min > max) {
                let Embed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("The minimum value is higher than the maximum value.")
                    .setDescription(`Minimum: **${min}** - Maximum: **${max}**`);
                return message.channel.send(Embed);
            }

            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            
            let Embed = new Discord.MessageEmbed()
                .setColor("#0099FF")
                .setTitle(`${message.author.username}, your random number is ${randomNumber}!`)
                .setDescription(`Minimum: **${min}** - Maximum: **${max}**`);
            message.channel.send(Embed);

        }
        
        let options = {timeout: deleteDelay}
        message.delete(options);

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the random command.")}
    },
};