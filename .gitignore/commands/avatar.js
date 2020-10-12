const Discord = require("discord.js");
const {version, creators, botavatar, deleteDelay} = require("../config.json");

module.exports = {
    name: 'avatar',
    description: "Displays the user's avatar and link",
    execute(message, args) {
        
        const user = message.mentions.users.first() || message.author;
        let Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(user.avatarURL({format:"png", dynamic:"true"}))
            .setTitle(`${user.username}'s avatar:`)
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);
        
        message.channel.send(Embed);

        let options = {timeout: deleteDelay}
        message.delete(options);

    },
};