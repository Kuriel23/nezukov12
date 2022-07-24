const Discord = require("discord.js");

module.exports = {
  name: "prova",
  description: "Adicionar provas aos banimentos!",
  aliases: ["provas", "p"],
  categoria: "moderação"
};

module.exports.run = async (client, message, res) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.inlineReply(
      new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor)
    );

  let codigo = res[0];
  let url = res[1];

  const comousar = new Discord.MessageEmbed()
    .setAuthor("Prova", "https://i.imgur.com/pIzuv8C.png")
    .setDescription(`Irá adicionar provas a um banimento`)
    .addField(
      "Como usar",
      `\`a?prova <codigo do banimento> <url da foto>\`\n\`prova anime https://imagem.png\``
    )
    .setColor(client.cor)
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());

  if (!url) return message.inlineReply(comousar);

  client.db.BanInfo.findOne({ _id: codigo }, function(err, doc) {
    if (!doc) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Código Inválido!", client.warn).setColor(client.cor));
    if (doc) {
      message.delete();
      message.channel.send(new Discord.MessageEmbed().setAuthor("» Provas Adicionadas!", client.ok).setColor(client.cor));
      doc.provas = url;
      doc.save();
    }
  });
};
