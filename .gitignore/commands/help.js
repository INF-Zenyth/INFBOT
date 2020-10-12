const Discord = require("discord.js");
const {prefix, version, creators, botavatar, deleteDelay} = require("../config.json");

module.exports = {
    name: 'help',
    description: 'Displays the help menu',
    execute(message, args) {
        
        let Embed1 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle('INFBOT | Help Menu')
            .setDescription('List of available commands')
            .setThumbnail('https://i.imgur.com/OjNo39d.png')
            .addFields(
                { name: `${prefix}help`, value: "```ini\n[Shows the help menu.]```"},
                
                { name: `${prefix}user`, value: "```ini\n[Gives you information about you such as your ID, when you joined Discord and this server.]\n```", inline: true},
                { name: `${prefix}server`, value: "```ini\n[Gives you information about the server you are on such as when it was created and more.]\n```", inline: true},
                { name: `${prefix}avatar`, value: "```ini\n[No argument: gives you your avatar.\n\nWith an argument: gives you the avatar of tagged user.]```", inline: true},

                //{ name: `${prefix}play`, value: "```ini\n[Plays the linked youtube video or adds it to the queue.]\n```", inline: true},                        //
                //{ name: `${prefix}skip`, value: "```ini\n[Skips the video that is currently playing, gonig to the next in the queue.]```", inline: true},       //      Temporarily removed
                //{ name: `${prefix}stop`, value: "```ini\n[Stops the bot and empties the song queue.]\n\n```", inline: true}                                     //
                )
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.channel.send(Embed1);

        let Embed2 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Admin Help Menu")
            .setDescription("List of available admin commands. If you don't have administrator privileges, you cannot execute them.")
            .setThumbnail("https://i.imgur.com/OjNo39d.png")
            .addFields(
                { name: `${prefix}setup`, value: "```ini\n[Sets up INFBOT for automatic voice channels.]```", inline: true},
                { name: `${prefix}unsetup`, value: "```ini\n[Gets rid of INFBOT's channels.\n\n```", inline: true},
                { name: `${prefix}status`, value: "```ini\n[Checks to see if INFBOT Voice Channels are activated or not.]```", inline: true},

                { name: `${prefix}kick`, value: "```ini\n[Kicks the tagged user (can include reason).]```", inline: true},
                { name: `${prefix}ban`, value: "```ini\n[Bans the tagged user (can include reason).]```", inline: true})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        message.channel.send(Embed2);

        let Embed3 = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("INFBOT | Additionnal Help")
            .setDescription("Do you need any additionnal help? Do you have any questions?")
            .setThumbnail("https://i.imgur.com/OjNo39d.png")
            .addFields(
                { name: `Head over to our Discord Server:`, value: `https://discord.gg/jwEp6VX`})
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`)

        message.channel.send(Embed3);

        let options = {timeout: deleteDelay}
        message.delete(options);

    },
};