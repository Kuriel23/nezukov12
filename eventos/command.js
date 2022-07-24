module.exports = {
  name: "command",
  type: "message"
}

module.exports.run = async (message, client) => {
  const Discord = require("discord.js");    
  if (message.author.bot) return;

  const prefixes = ['a?', 'A?'];
  
  const prefix = prefixes.find(x => message.content.startsWith(x))
    
  if (prefix) {    
    if (!message.content.startsWith(prefix))
      return;
    
    const res = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = res.shift().toLowerCase();
    
    const used = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (!used) return 0;  

    used.run(client, message, res);
    client.channels.cache.get("960575934736502814").send(new Discord.MessageEmbed().setDescription(`${message.author.tag} usou ${command} ${res}`).setColor(client.cor));
  }  
};