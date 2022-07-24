const Discord = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Acho que já deu um tempo depois do castigo! Vamos dar um unmute nesse otário!",
  aliases: ["desmutar", "um"],
  categoria: "moderação"
}

module.exports.run = async (client, message, res) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) {return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor))}

  const member = message.mentions.members.first();

  if (!member) {return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Quem deve-se desmutar?", client.warn).setColor(client.cor));}

  let muterole = message.guild.roles.cache.find(x => x.name === "Silenciado");

  member.roles.remove(muterole);

  message.inlineReply(new Discord.MessageEmbed().setAuthor(`${message.mentions.users.first().username} foi desmutado!`, "https://i.imgur.com/Gvz5WnU.png").setColor(client.cor));

  let unmuteEmbed = new Discord.MessageEmbed()
    .setAuthor("» Desmutado", "https://i.imgur.com/Wl8X8V3.png")
    .setDescription(`Usuário Desmutado: ${member.user.tag}\nStaff: ${message.author.tag}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(client.cor)
    .setTimestamp();
  client.channels.cache.get("960582101726552194").send(unmuteEmbed);
};
