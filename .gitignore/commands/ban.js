const Discord = require("discord.js");
const {prefix, version, creators, botavatar, deleteDelay, consoleExecutedCommands} = require("../config.json");

module.exports = {
    name: "ban",
    description: "Bans the tagged user.",
    execute(message, args) {

        if(message.member.hasPermission("ADMINISTRATOR")) {
            const user = message.guild.member(message.mentions.users.first());

            if(!user) {
                let Embed = new Discord.MessageEmbed()
                    .setColor('#990000')
                    .setTitle("You need to tag a user to ban them.")
                    .addFields(
                        {name: `Try using: "${prefix}ban @User <Reason>"`, value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
                    .setTimestamp()
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)
                    .then(msg => {
                        msg.delete({timeout: 20000})
                    })
                    .catch(console.error);

                if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the ban command and forgot to tag a user.")}
            }
            else if(user == message.author) {
                let Embed = new Discord.MessageEmbed()
                    .setColor('#990000')
                    .setTitle("You can't ban yourself...")
                    .setTimestamp()
                    .addFields(
                        {name: "Why would you want to ban yourself? That seems counterproductive...", value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)
                    .then(msg => {
                        msg.delete({timeout: 20000})
                    })
                    .catch(console.error);

                if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the ban command and tried to ban themselves.")}
            }
            else {
                let userN = message.mentions.users.first().username;
                let reason = args.slice(1).join(" ");
                if(!reason) {reason = "None"};

                let Embed = new Discord.MessageEmbed()
                    .setColor('#009900')
                    .setTitle(`This user has been banned from the server!`)
                    .setTimestamp()
                    .addFields(
                        {name: `${userN} has been banned from the server.`, value: `Reason: ${reason}.`})
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)

                user.ban({reason: reason})

                if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the ban command successfully.")}
            } 
        }
        else {
            let Embed = new Discord.MessageEmbed()
                .setColor('#990000')
                .setTitle('You seem to have insufficient permissions...')
                .setTimestamp()
                .addFields(
                    {name: "You need Administrator privileges to ban a user.", value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            message.channel.send(Embed)
                .then(msg => {
                    msg.delete({timeout: 20000})
                })
                .catch(console.error);

            if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the ban command but didn't have the required permissions.")}
        }
        let options = {timeout: deleteDelay}
        message.delete(options);
    },
};