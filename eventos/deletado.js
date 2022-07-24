module.exports = {
  name: "deletado",
  type: "messageDelete",
};

module.exports.run = async (messageDelete, client) => {
  const Discord = require("discord.js");

  if (messageDelete.guild.id != "531574473644703744") return;

  const { attachments } = messageDelete;
  const messageHadAttachment = attachments.first();

  // [ - LOG M/DELETADAS]
  if (messageDelete.author.bot) return 0;
  if (messageDelete.content.startsWith("a?")) return 0;
  let MensagemDeletadaEmbed = new Discord.MessageEmbed()
    .setAuthor("[MENSAGEM]", messageDelete.author.displayAvatarURL())
    .setDescription("Uma mensagem foi deletada.")
    .addField("No canal:", messageDelete.channel, true)
    .addField("De:", messageDelete.author.tag, true)
    .addField("Mensagem:", messageDelete.content || "Nada?")
    .setColor(client.cor)
    .setTimestamp();
  if (messageHadAttachment)
    MensagemDeletadaEmbed.setImage(messageHadAttachment.proxyURL);

  client.channels.cache.get("960575934736502814").send(MensagemDeletadaEmbed);
};
