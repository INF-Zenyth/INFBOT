const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay, consoleExecutedCommands} = require("../config.json");

module.exports = {

    name: 'user',
    description: "Your information",
    execute(message, args) {

        var memberJoin = message.member.joinedAt.toString();
        let Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setThumbnail(message.author.avatarURL({format:"png", dynamic:"true"}))
            .setTitle('User Info')
            .addField('Username:', `${message.author.tag}`)
            .addField('ID:', message.author.id)
            .addField('Joined Discord:', message.author.createdAt)
            .addField(`Joined ${message.guild}:`, memberJoin)
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.channel.send(Embed);

        let options = {timeout: deleteDelay}
        message.delete(options);
        
        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the user command.")}
    },
};