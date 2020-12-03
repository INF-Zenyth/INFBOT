const Discord = require("discord.js");
const {prefix, version, creators, botavatar, deleteDelay, consoleExecutedCommands} = require("../config.json");

module.exports = {
    name: 'help',
    description: 'Displays the help menu',
    execute(message, args) {
        
        let Embed1 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Help Menu")
            .setDescription("List of available commands")
            .setThumbnail(botavatar)
            .addFields(
                { name: `${prefix}help`, value: "```ini\n[Shows the help menu.]```"},
                
                { name: `${prefix}user`, value: "```ini\n[Gives you information about you such as your ID, when you joined Discord and this server.]```", inline: true},
                { name: `${prefix}server`, value: "```ini\n[Gives you information about the server you are on such as when it was created and more.]```", inline: true},
                { name: `${prefix}avatar`, value: "```ini\n[No argument: gives you your avatar.\nWith an argument: gives you the avatar of tagged user.]```", inline: true},

                { name: `${prefix}bot`, value: "```ini\n[Gives you information about the bot such as updates, user count and more.]```", inline: true},
                { name: `${prefix}suggest`, value: "```ini\n[Let's you suggest something. Will only work if there is a suggestions channel.]```", inline: true})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.author.send(Embed1);

        let Embed2 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Admin Help Menu")
            .setDescription("List of available admin commands. If you don't have administrator privileges, you cannot execute them.")
            .setThumbnail(botavatar)
            .addFields(
                { name: `${prefix}setup`, value: "```ini\n[Sets up INFBOT for automatic voice channels.]```", inline: true},
                { name: `${prefix}unsetup`, value: "```ini\n[Gets rid of INFBOT's automatic voice channels.]```", inline: true},
                { name: `${prefix}status`, value: "```ini\n[Checks to see if INFBOT Voice Channels are activated or not.]```", inline: true},

                { name: `${prefix}kick`, value: "```ini\n[Kicks the tagged user (can include reason).]```", inline: true},
                { name: `${prefix}ban`, value: "```ini\n[Bans the tagged user (can include reason).]```", inline: true})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.author.send(Embed2);

        let Embed3 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Additionnal Help")
            .setDescription("Do you need any additionnal help? Do you have any questions?")
            .setThumbnail(botavatar)
            .addFields(
                { name: `Head over to our Discord Server:`, value: `https://discord.gg/jwEp6VX`})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`)

        message.author.send(Embed3);

        let Embed4 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Add/Vote")
            .setDescription("Don't forget to add this bot to your server or upvote it if you like it!")
            .setThumbnail(botavatar)
            .addFields(
                { name: "Invite INFBOT to your server:", value: "[Discord Invite](https://discord.com/api/oauth2/authorize?client_id=732316684496404521&permissions=17047574&scope=bot)"},
                { name: "Head over to our top.gg page:", value: "[Top.gg](https://top.gg/bot/732316684496404521)"})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`)

        message.author.send(Embed4)

        let Embed5 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("I've sent you a DM with the available commands.")

        message.channel.send(Embed5)
            .then(msg => {
                msg.delete({timeout: 5000})
            })
            .catch(console.error);

        let options = {timeout: deleteDelay}
        message.delete(options);

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the help command.")}
    },
};
