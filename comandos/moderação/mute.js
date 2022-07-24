const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-br");

module.exports = {
  name: "mute",
  description: "Um otário está aprontando alguma, acho que é hora de dar um mute!",
  aliases: ["mutar", "m"],
  categoria: "moderação"
};

module.exports.run = async (client, message, res) => {
  let member = message.guild.member(
    message.mentions.users.first() || client.users.cache.get(res[0])
  );
  if (!member) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Indique uma Menção!", client.warn).setColor(client.cor));
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
    if(member.roles.cache.has('840745033274490880')) {
    return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Você não pode mutar seus colegas!", client.err).setColor(client.cor))
}
  let Entrado2 = moment(member.joinedTimestamp)
    .startOf("hour")
    .fromNow();
  let reason = res.slice(1).join(" ");
  if (!reason) reason = "Nenhuma razão foi fornecida!";
    let myRole = message.guild.roles.cache.get("840753680143089675");
    member.roles.add(myRole);
    let muteEmbed = new Discord.MessageEmbed()
      .setAuthor(
        "» Mute",
        "https://i.imgur.com/5aFeS1u.png"
      )
      .setDescription(
        `Usuário: ${member}\nID: ${member.id}\nStaff: ${message.author}\nMotivo: ${reason}`
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(client.cor)
      .setTimestamp();
    
    client.channels.cache
      .get("960582101726552194")
      .send("Novo silenciamento:", muteEmbed);
    message.inlineReply(
      `O mute de ${member} foi feito com sucesso por ${reason}! Finalmente temos mais silêncio nesta bagaça!\n\nEste Usuário entrou ${Entrado2}`
    );
  client.db.Users.findOne({ _id: message.author.id }, function(err, doc) {
    if (doc) {
      doc.animecoins += 2500
      doc.save();
    }
    if (!doc) {
      const docToSave = new client.db.Users({
        _id: member.id,
      });
      docToSave.save();
    }
  });
  client.db.Users.findOne({ _id: member.id }, function(err, doc) {
    if (doc) {
      doc.punishments.mutes.push(reason);
      doc.save();
    }
    if (!doc) {
      const docToSave = new client.db.Users({
        _id: member.id,
        punishments: { mutes: [reason] }
      });
      docToSave.save();
    }
  })}
