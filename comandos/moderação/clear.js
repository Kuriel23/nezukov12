const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Eu irei limpar essa bagunça, deixa comigo!",
  aliases: ["limpar", "clean", "c"],
  categoria: "moderação"
}

module.exports.run = async (client, message, res) => {

  const comousar = new Discord.MessageEmbed()
    .setAuthor("» Clear", "https://i.imgur.com/ZVyIjT9.png")
    .setDescription(`Irá limpar algumas mensagens dentro do chat`)
    .addField("Como usar", `\`a?clear <quantidade>\`\n\`clear 100\``)
    .setColor(client.cor)
    .setFooter(`${message.author.tag}`, message.author.avatarURL())
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Comando com permissão apenas para administradores!", client.err).setColor(client.cor));
  if(!res[0]) return message.inlineReply(comousar);
  if(isNaN(res[0])) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Informe um número!", client.err).setColor(client.cor))
  if(res[0] > 100) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Erro da API, impossível limpar mais de 100 mensagens!", client.err).setColor(client.cor))
  if(res[0] < 2) return message.inlineReply(new Discord.MessageEmbed().setAuthor("» Erro da API, impossível limpar menos de 1 mensagem!", client.err).setColor(client.cor))
  
  message.channel.bulkDelete(res[0], true).then(() => {client.channels.cache.get('960575934736502814').send(`Apaguei ${res[0]} mensagens pelo ${message.author.tag}`)});}