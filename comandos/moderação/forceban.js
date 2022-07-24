const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
  name: "forceban",
  description: "Eu forçarei o banimento por ID!",
  aliases: ["forcebanir", "fb"],
  categoria: "moderação"
};

module.exports.run = async (client, message, res) => {
  if (message.guild.id != "531574473644703744")
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para o servidor oficial!", client.err).setColor(client.cor));
  let codigo = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
  if (!res[0])
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Informe um ID Válido!", client.warn).setColor(client.cor));
  if (res[0] === message.author.id)
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Você não pode se banir!", client.err).setColor(client.cor));
  let reason = res.slice(1).join(" ");
  if (!reason) reason = "Nenhuma razão foi fornecida!";

  let guild = message.client.guilds.cache.get(message.guild.id)

  guild.members.ban(res[0]);

  message.inlineReply(
    "O usuário " +
      res[0] +
      " levou uma marretada forçada no cu.\n\nAh! Código para adicionar provas: " +
      codigo
  );
  let banEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "» Force Ban | Código: " + codigo,
      "https://i.imgur.com/7PxeOrT.png", "https://animesgamesbot.ml/baninfo/"+codigo
    )
    .setDescription(
      "Usuário Banido: " + res[0] + "\n\nStaff: " + message.author.tag
    )
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(client.cor)
    .setTimestamp();

  client.channels.cache
    .get("960582101726552194")
    .send("Novo Banimento: ", banEmbed);
  client.db.Users.findOne({ _id: message.author.id }, function(err, doc) {
    if (doc) {
      doc.animecoins += 5000;
      doc.save();
    }
    if (!doc) {
      const docToSave = new client.db.Users({
        _id: message.author.id
      });
      docToSave.save();
    }
  });
  const docToSave = new client.db.BanInfo({
    _id: codigo,
    motivo: reason,
    data: moment().format("LLL"),
    autor: message.author.tag,
    banido: res[0]
  });
  docToSave.save();
};
