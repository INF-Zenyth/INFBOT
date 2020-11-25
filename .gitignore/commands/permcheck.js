const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, consoleExecutedCommands} = require("../config.json");

module.exports = {
    name: 'permcheck',
    description: "Checks to see if the user has administrator privileges.",
    guildOnly: true,
    execute(message, args) {
        
        if(message.member.hasPermission("ADMINISTRATOR")) {

            let Embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("You have administrator privileges therefore you can use INFBOT's admin commands.")
                .setTimestamp()
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            message.channel.send(Embed)
                .then(msg => {
                    msg.delete({timeout: 20000})
                })
                .catch(console.error);            
        }
        else {

            let Embed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("You don't have administrator privileges therefore you can't use INFBOT's admin commands.")
                .setTimestamp()
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            message.channel.send(Embed)
                .then(msg => {
                    msg.delete({timeout: 20000})
                })
                .catch(console.error);
        }
        let options = {timeout: deleteDelay}
        message.delete(options);

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the permcheck command.")}
    },
};