module.exports = {
    name: 'react',
    description: 'reacts',
    execute(message, args) {

        if(message.member.hasPermission("ADMINISTRATOR")) {
        
            message.react('650436228059234313');    //  Warframe
            message.react('687941410019737745');    //  RL Esports
            message.react('655107911374209066');    //  RL
            message.react('655106909472292874');    //  PUBG
            message.react('728612521581215804');    //  Minecraft
            message.react('726857979047182357');    //  GTAV
            message.react('687941409919074358');    //  ARK
            message.react('726855950614397011');    //  Apex Legends

        }
    },
};