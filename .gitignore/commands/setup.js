const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, autoChannelName, autoChannelCategory} = require("../config.json");

module.exports = {

    name: 'setup',
    description: "This command initialises INFBOT with the required channels",
    execute(message, args) {

        let guild = message.guild;
        var channel_finder = message.guild.channels.cache.find(channel => channel.name === autoChannelName);

        if(message.member.hasPermission("ADMINISTRATOR")) {

            if(typeof channel_finder === "undefined") {

                guild.channels.create(autoChannelCategory, {

                    type: "category"
                    

                });

                setTimeout(function(){ 
                    
                    guild.channels.create(autoChannelName, {
                    
                        type: "voice", 
                        parent: guild.channels.cache.find(channel => channel.name === autoChannelCategory && channel.type == "category")
    
                    })
    
                        .catch(console.error);

                }, 500);

                let Embed = new Discord.MessageEmbed()
                    .setColor('#009900')
                    .setTitle('INFBOT Voice Channels are now ready to go!')
                    .addFields(
                        { name: 'Thanks you for using INFBOT!', value: `You may move the "Voice Channels" category wherever you want in your server.\nPlease do not rename the new channels as it may interfere with the bot.`},)
                    .setTimestamp()
                    .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
                message.channel.send(Embed)

            }

            else {

                let Embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('INFBOT Voice Channels are already working on this server!')
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
                    {name: "You need Administrator privileges to setup INFBOT Voice Channels.", value: "If you think this is an error, please leave a message on the Infernal Discord server: https://discord.gg/jwEp6VX"})
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            message.channel.send(Embed)

        }

        let options = {timeout: deleteDelay}
        message.delete(options);
        
    },
};