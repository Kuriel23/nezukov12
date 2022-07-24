const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
  name: "ban",
  description: "Eu vou banir o babaca que não respeita as suas regras!",
  aliases: ["banir", "b"],
  categoria: "moderação"
};

module.exports.run = async (client, message, res) => {
  if (message.guild.id != "531574473644703744")
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando apenas para o servidor oficial!", client.err).setColor(client.cor));
  let codigo = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
  let member = message.guild.member(
    message.mentions.users.first() || client.users.cache.get(res[0])
  );
  if (!member)
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Informe uma menção!", client.warn).setColor(client.cor));
    if(member.roles.cache.has('840745033274490880')) {
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Você não pode banir seus colegas!", client.err).setColor(client.cor))
}
  if (member.user.id === message.author.id)
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Você não pode se banir!", client.err).setColor(client.cor));
  if (!member.bannable)
    return message.inlineReply(
      new Discord.MessageEmbed().setAuthor("» Usuário não é possível banir!", client.warn).setColor(client.cor)
    );
  let reason = res.slice(1).join(" ");
  if (!reason) reason = "Nenhuma razão foi fornecida!";

  member.ban({
    reason: reason + " Punido por: " + message.author.tag,
    days: 1
  });

  message.inlineReply(
    "O usuário " +
      member.user.tag +
      " levou uma marretada no cu.\n\nAh! Código para adicionar provas: " +
      codigo
  );
  let banEmbed = new Discord.MessageEmbed()
    .setAuthor(
      "» Ban | Código: " + codigo,
      "https://i.imgur.com/7PxeOrT.png", "https://animesgamesbot.ml/baninfo/"+codigo
    )
    .setDescription(
      "Usuário Banido: " + member.user.tag + "\n\nStaff: " + message.author.tag
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
    banido: member.user.tag + " (" + member.user.id + ")"
  });
  docToSave.save();
};
