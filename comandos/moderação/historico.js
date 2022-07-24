const Discord = require("discord.js");

module.exports = {
  name: "historico",
  description: "Irei ver na minha database, o que esse bagunçeiro ficou armando!",
  aliases: ["history", "punicoes", "punições", "punishments", "h"],
  categoria: "moderação"
}

module.exports.run = async (client, message, res) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
  const user =
    message.mentions.users.first() || client.users.cache.get(res[0]);
  if (!user)
    return message.inlineReply(
      new Discord.MessageEmbed().setAuthor("» Indique uma ID ou menção!", client.warn).setColor(client.cor)
    );

  const mentionedDatabase = await client.db.Users.findOne({ _id: user.id });
  if (!mentionedDatabase)
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Usuário não encontrado!", client.warn).setColor(client.cor));
  const userMutes = mentionedDatabase.punishments.mutes;
  const userAutobot = mentionedDatabase.punishments.autobot;

  message.inlineReply(
    "**Histórico de**: ``" +
      user.tag +
      "``\n**Watch Dogs (" +
      userAutobot.length +
      "):** `" +
      (userAutobot.length > 0
        ? userAutobot.join(" | ")
        : "Nenhuma punição Watch Dogs.") +
      "`\n**Mutes (" +
      userMutes.length +
      "):** `" +
      (userMutes.length > 0 ? userMutes.join(" | ") : "Nenhum mute.") +
      "`"
  );
};