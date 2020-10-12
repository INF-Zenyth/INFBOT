const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay} = require("../config.json");

module.exports = {
    name: 'suggest',
    execute(message, args) {

        let suggestionChannel = message.guild.channels.cache.find(channel => channel.name.includes("suggestions"))
        if(message.channel == suggestionChannel) {

            let suggestion = args.slice(0).join(" ");
            let Embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${message.author.username}'s Suggestion:`)
                .setDescription(`${suggestion}`)
                .setTimestamp()
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
            
            message.channel.send(Embed).then(sentMessage => {
                sentMessage.react("744363950417903738" || "✅");
                sentMessage.react("744363920353001606" || "❌");
            })
        }
        else {

            let Embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(':x:  Error!')
                .setDescription('You need to post your suggestion in the suggestions channel!')
                .setTimestamp()
                .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

            message.channel.send(Embed)
                .then(msg => {
                    msg.delete({timeout: 5000})
                })
                .catch(console.error);

        }
        let options = {timeout: deleteDelay}
            message.delete(options);

    },
};