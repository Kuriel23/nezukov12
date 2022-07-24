const Discord = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Acho que já deu um tempo depois dessa baderna! Vamos dar um unlock aqui!",
  aliases: ["desbloquear", "ul"],
  categoria: "moderação"
}

module.exports.run = async (client, message, res) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.inlineReply(
      new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor)
    );
  message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
    SEND_MESSAGES: true
  });
  message.inlineReply(
    "Chat desbloqueado com sucesso, use ``a?lock`` para bloquear o canal."
  );
  client.channels.cache
    .get("960575934736502814")
    .send(
      `${message.author.tag} usou unlock no canal <#${message.channel.id}>`
    );
};
