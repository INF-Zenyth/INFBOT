const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, consoleExecutedCommands} = require("../config.json");

module.exports = {
    name: 'server',
    description: 'Displays server information',
    execute(message, args) {

        let Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Server Information: ${message.guild.name}`)
            .setDescription("Here's some information about this server")
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Members:', value: `${message.guild.memberCount} members.`},
                { name: 'Number of channels:', value: `${message.guild.channels.cache.size} channels.`},
                { name: 'Created:', value: `${message.guild.createdAt}`},)
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.channel.send(Embed);

        let options = {timeout: deleteDelay}
        message.delete(options);

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the server command.")}
    },
};