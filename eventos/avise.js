module.exports = {
  name: "avise",
  type: "message"
}

module.exports.run = async (message, client) => {

  if (message.author.bot) return;
  if (message.member.hasPermission("BAN_MEMBERS")) return 0;

  if (message.channel.id === "900459492922249226") {
  if (!message.content.includes("https://")) return message.reply("Faça o seu reporte mais claro, precisamos de um link para a nossa equipe saber onde está o problema, cumpra o exemplo enviado na primeira mensagem do canal.").then(msg => {
    msg.delete({ timeout: 30000 })
  })
  }
}