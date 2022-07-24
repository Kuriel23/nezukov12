const Discord = require('discord.js')

module.exports = {
  name: "baninfo",
  description: "",
  aliases: ["bi"]
}

module.exports.run = async (client, message, res) => {
    try {const codigo = res.join(' ');
  const userDB = await client.db.BanInfo.findOne({ _id: codigo });
  var BanInfoEmbed = new Discord.MessageEmbed()
        .setAuthor(`» Código ${codigo} de banimento de: ${userDB.banido}`, "https://i.imgur.com/h0NAWyD.png")
        .addField("Autor:", userDB.autor, true)
        .addField("Data:", userDB.data, true)
        .addField("Motivo:", userDB.motivo,true)
        .addField("Provas:", userDB.provas.length > 0 ? userDB.provas.join(" | ") : "Nenhuma prova foi colocada.")
        .setColor(client.cor)
        message.inlineReply(BanInfoEmbed)
} catch(err) {
  message.inlineReply(new Discord.MessageEmbed().setAuthor("» Código Inválido!", client.warn).setColor(client.cor))
}}