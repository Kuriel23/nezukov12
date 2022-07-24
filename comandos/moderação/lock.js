const Discord = require("discord.js");

module.exports = {
  name: "lock",
  description: "Eita! O Chat virou uma baderna! Ainda bem que tenho ferramentas para isso, use este comando para bloquear o chat!",
  aliases: ["bloquear", "l"],
  categoria: "moderação"
}

module.exports.run = async (client, message, res) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
  message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
  message.inlineReply("Chat bloqueado com sucesso, use ``a?unlock`` para desbloquear o canal.")
  client.channels.cache.get("960575934736502814").send(`${message.author.tag} usou lock no canal <#${message.channel.id}>`);
};