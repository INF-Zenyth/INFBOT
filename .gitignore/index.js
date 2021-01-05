const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
const fs = require("fs");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const {prefix, version, autoChannelName, autoChannelCategory, token, creators, botavatar, deleteDelay, reactionRolesChannel, patchdate, patchnotes, consoleExecutedCommands} = require('./config.json');

client.on("ready", () => {

    const status = [
        `${client.guilds.cache.size} servers | ${prefix}help`,
        `${client.channels.cache.size} channels | ${prefix}help`,
        `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users | ${prefix}help`,
    ];
    var x = 0;

    setInterval( () => {
        
        client.user.setActivity(status[x], {type: "WATCHING"});
        x = x+1;
        if(x == 3){
            x = 0;
        }
    }, 10000);
    
    console.log(`INFBOT ${version} Online • ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users • ${client.channels.cache.size} channels • ${client.guilds.cache.size} servers`);
    console.log(client.guilds.cache.map(stats => `INFBOT: Guild: ${stats.name} | Member Count: ${stats.memberCount}`))
});

client.on("guildCreate", guild => {
    console.log(`New server: ${guild.name} (ID: ${guild.id}) with ${guild.memberCount} members.`);
    client.user.setActivity(`${client.guilds.cache.size} servers | //help`, {type: "WATCHING"});
});

client.on("guildDelete", guild => {
    console.log(`Removed from: ${guild.name} (ID: ${guild.id}).`);
    client.user.setActivity(`${client.guilds.cache.size} servers | //help`, {type: "WATCHING"});
});

client.on('message', async message => {

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(message.content.startsWith(`${prefix}bot`)) {

        botcommand(message);
        return;

    }
    
    if(!client.commands.has(command)) return;

    try {
        
            client.commands.get(command).execute(message, args);

    }
    catch(error) {

        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(':x:  Error!')
            .setDescription('Command not executed successfully.')
            .setTimestamp()
            .setFooter(`INFBOT by ${creators} • ${version}`, `${botavatar}`);

        console.error(error);
        message.channel.send(errorEmbed)
            .then(msg => {
                msg.delete({timeout: 5000})
            })
            .catch('Erreur');

        let options = {timeout: deleteDelay}
        message.delete(options);
    }
});

function botcommand(message) {

    let totalSeconds = (client.uptime / 1000);
    let totalDays = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let totalHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${totalDays} days\n${totalHours} hours\n${totalMinutes} minutes\n${seconds} seconds`;

    let Embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("INFBOT")
        .setThumbnail(botavatar)
        .addFields(
            { name: "Uptime", value: `${uptime}`, inline: true},
            { name: "Developer", value: "Zenyth#4037", inline: true},
            { name: "Helper", value: "Atineon#2652", inline: true},
            { name: "Version", value: `${version}`, inline: true},
            { name: "Node JS", value: "12.18.3", inline: true},
            { name: "Library", value: "discord.js 12", inline: true},
            { name: "Users", value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, inline: true},
            { name: "Servers", value: `${client.guilds.cache.size} servers`, inline: true},
            { name: "Channels", value: `${client.channels.cache.size} channels`, inline: true},
            { name: "Developer's Discord", value: "https://discord.gg/XjZSh7F"},
            { name: `Last Update [${patchdate}]`, value: `${patchnotes}`})

    message.channel.send(Embed);
    let options = {timeout: deleteDelay}
    message.delete(options);

    if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the bot command.")}
};

var temporary = []

client.on('voiceStateUpdate', async (oldState, newState) =>{
    const mainCategory = newState.guild.channels.cache.find(channel => channel.name === autoChannelCategory && channel.type == "category").id;
    const mainChannel = newState.guild.channels.cache.find(channel => channel.name === autoChannelName).id;
    if(newState.channelID == mainChannel){
        console.log(`INFBOT: Creating a new voice channel for ${newState.member.user.username}...`);
        await newState.guild.channels.create(`${newState.member.user.username} [General]`, {type: 'voice', parent: mainCategory})
            .then(async channel => {
                temporary.push({ newID: channel.id, guild: newState.guild.id })
                await newState.member.voice.setChannel(channel.id)
            })
            console.log("INFBOT: Channel created!");
    }
    if(temporary.length >= 0) for (let i = 0; i < temporary.length; i++) {
        let ch = client.guilds.cache.find(x => x.id === temporary[i].guild).channels.cache.find(x => x.id === temporary[i].newID)
        if(ch.members.size <= 0){
            console.log("INFBOT: Deleting a channel...");
            await ch.delete()
            console.log("INFBOT: Channel deleted!");
            return temporary.splice(i, 1)
        }
    }
})

client.on("messageReactionAdd", async (reaction, user) => {         // Only the Infernal Discord Server currently supports Reaction Roles

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === reactionRolesChannel) {

        if(reaction.emoji.id === "650436228059234313") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("649915251470630912");

        }
        if(reaction.emoji.id === "687941410019737745") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("687926881752055808");

        }
        if(reaction.emoji.id === "655107911374209066") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("649917383900790805");

        }
        if(reaction.emoji.id === "655106909472292874") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("649915298303967233");

        }
        if(reaction.emoji.id === "728612521581215804") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("728612618612244513");

        }
        if(reaction.emoji.id === "726857979047182357") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("726852875426201650");

        }
        if(reaction.emoji.id === "687941409919074358") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("687640075512840196");

        }
        if(reaction.emoji.id === "726855950614397011") {

            await reaction.message.guild.members.cache.get(user.id).roles.add("726852871974551643");

        }
    }
});

client.on("messageReactionRemove", async (reaction, user) => {         // Only the Infernal Discord Server currently supports Reaction Roles

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === reactionRolesChannel) {

        if(reaction.emoji.id === "650436228059234313") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("649915251470630912");

        }
        if(reaction.emoji.id === "687941410019737745") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("687926881752055808");

        }
        if(reaction.emoji.id === "655107911374209066") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("649917383900790805");

        }
        if(reaction.emoji.id === "655106909472292874") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("649915298303967233");

        }
        if(reaction.emoji.id === "728612521581215804") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("728612618612244513");

        }
        if(reaction.emoji.id === "726857979047182357") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("726852875426201650");

        }
        if(reaction.emoji.id === "687941409919074358") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("687640075512840196");

        }
        if(reaction.emoji.id === "726855950614397011") {

            await reaction.message.guild.members.cache.get(user.id).roles.remove("726852871974551643");

        }
    }
});

client.login(process.env.TOKEN);

/*
Infernal Discord Server Reaction Roles
:warframe: 650436228059234313           //  649915251470630912
:rle: 687941410019737745                //  687926881752055808
:rl: 655107911374209066                 //  649917383900790805
:pubg: 655106909472292874               //  649915298303967233
:mc: 728612521581215804                 //  728612618612244513
:gta: 726857979047182357                //  726852875426201650
:ark: 687941409919074358                //  687640075512840196
:apex: 726855950614397011               //  726852871974551643
*/
