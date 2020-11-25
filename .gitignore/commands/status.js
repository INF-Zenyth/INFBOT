const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, autoChannelName, consoleExecutedCommands} = require("../config.json");

module.exports = {

    name: 'status',
    description: "This command only checks if INFBOT Voice Channels are working",
    execute(message, args) {

        let guild = message.guild;
        var channel_finder = message.guild.channels.cache.find(channel => channel.name === autoChannelName);

        if(message.member.hasPermission("ADMINISTRATOR")) {

            if(typeof channel_finder === "undefined") {

                let Embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("INFBOT Voice Channels aren't on this server.")
                    .setTimestamp()
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)
                    .then(msg => {
                        msg.delete({timeout: 10000})
                    })
                    .catch(console.error);

            }

            else {

                let Embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('INFBOT Voice Channels are working on this server!')
                    .setTimestamp()
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)
                    .then(msg => {
                        msg.delete({timeout: 20000})
                    })
                    .catch(console.error);

            }

        }

        else {

            let Embed = new Discord.MessageEmbed()
                .setColor('#990000')
                .setTitle('You seem to have insufficient permissions...')
                .setTimestamp()
                .addFields(
                    {name: "You need Administrator privileges to check the status of INFBOT Voice Channels.", value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            message.channel.send(Embed)
                .then(msg => {
                    msg.delete({timeout: 20000})
                })
                .catch(console.error);

        }

        let options = {timeout: deleteDelay}
        message.delete(options);

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the status command.")}
        
    },
};