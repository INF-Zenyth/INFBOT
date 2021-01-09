const Discord = require("discord.js");
const {consoleExecutedCommands, prefix, deleteDelay} = require("../config.json");

module.exports = {

    name: "rteams",
    description: "Random team generator",
    execute(message, args) {

        joinedArgs = args.join(" ");
        let splitArgs = joinedArgs.split(",");
        let names = [];
        for(i in splitArgs) {names.push(splitArgs[i].trim())};

        if(names.length < 3) {

            let Embed = new Discord.MessageEmbed()
                .setColor("#0099FF")
                .setTitle("How to use the __rteams__ command:")
                .setDescription(`${prefix}rteams **user1, user2, user3,**...\nSeperate each name with a comma (**,**).\nRequires a minimum of **3** names.`);
            message.channel.send(Embed);

        } else {

            let listTeamEmbed = new Discord.MessageEmbed()
                .setColor("#0099FF")
                .setTitle("Participants:")
                .setDescription(`${names.join("\n")}`);
            let numberTeamsEmbed = new Discord.MessageEmbed()
                .setColor("#0099FF")
                .setTitle("How many people per team?");
            message.channel.send(listTeamEmbed)
                .then(message.channel.send(numberTeamsEmbed))
                .catch(console.error);
            
            const filter = m => m.content.includes("");
            const collector = message.channel.createMessageCollector(filter, {time: 30000, max: 3, errors: ["time"]})
            let namesPerTeam = []

            collector.on("collect", m => {namesPerTeam.push(m.content)});
            collector.on("end", collected => {

                if(!isNaN(namesPerTeam[2]) && namesPerTeam[2] >= 1) {

                    numPT = parseInt(namesPerTeam[2])

                    for(let i = names.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [names[i], names[j]] = [names[j], names[i]];
                    }

                    function chunk(array, size) {
                        const chunked_arr = [];
                        for(let i = 0; i < array.length; i++) {
                            const last = chunked_arr[chunked_arr.length - 1];
                            if(!last || last.length === size) {
                                chunked_arr.push(["Team: " + array[i]]);
                            } else {
                                last.push(" " + array[i]);
                            }
                        }
                        return chunked_arr;
                    }
                    
                    let resultEmbed = new Discord.MessageEmbed()
                        .setColor("#0099FF")
                        .setTitle("The teams are:")
                        .setDescription(`${chunk(names, numPT).join("\n")}`)
                    message.channel.send(resultEmbed);

                }
                else {

                    let ErrorEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(":x:  Error")
                        .setDescription("• You ran out of time or you entered a value < 1.")
                    message.channel.send(ErrorEmbed);

                }
            });
        }

        if(consoleExecutedCommands == "Yes") {console.log("INFBOT: A user executed the randomteams command.")}
    },
};