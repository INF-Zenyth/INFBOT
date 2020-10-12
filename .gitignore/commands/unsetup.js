const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, autoChannelName, autoChannelCategory} = require("../config.json");

module.exports = {

    name: 'unsetup',
    description: "This command gets rid of INFBOT channels",
    execute(message, args) {

        let guild = message.guild;
        var channel_finder = message.guild.channels.cache.find(channel => channel.name === autoChannelName);

        if(message.member.hasPermission("ADMINISTRATOR")) {

            if(channel_finder) {

                guild.channels.cache.find(channel => channel.name === autoChannelName).delete();
                guild.channels.cache.find(category => category.name === autoChannelCategory).delete();

                let Embed = new Discord.MessageEmbed()
                    .setColor('#990000')
                    .setTitle('INFBOT Voice Channels are leaving...')
                    .addFields(
                        { name: 'We hope you liked INFBOT Voice Channels.', value: `If you were experiencing any problems or want to leave feedback, you may join the Infernal Discord server: https://discord.gg/jwEp6VX`},)
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

        }

        else {

            let Embed = new Discord.MessageEmbed()
            .setColor('#990000')
            .setTitle('You seem to have insufficient permissions...')
            .setTimestamp()
            .addFields(
                {name: "You need Administrator privileges to get rid of INFBOT Voice Channels.", value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
        message.channel.send(Embed)
            .then(msg => {
                msg.delete({timeout: 20000})
            })
            .catch(console.error);

        }

        let options = {timeout: deleteDelay}
        message.delete(options);
        
    },
};