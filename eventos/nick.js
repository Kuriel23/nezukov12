module.exports = {
  name: "nick",
  type: "guildMemberUpdate"
}

module.exports.run = async (oldMember, newMember, client) => {

  const Discord = require("discord.js");
  
  if (oldMember.guild.id != "531574473644703744") return;

  var membros = [oldMember.nickname, newMember.nickname];
  if (membros[0] == null) {
    membros[0] = oldMember.user.username;
  }
  if (membros[1] == null) {
    membros[1] = newMember.user.username;
  }
  if (membros[2] == null) {
    membros[2] = newMember.user.id;
  }
  if (oldMember.nickname != newMember.nickname) {
    let MembroNickEmbed = new Discord.MessageEmbed()
      .setAuthor("[MEMBRO]", oldMember.user.displayAvatarURL())
      .setDescription("Um membro mudou seu nick.")
      .addField("Antigo Nome:", `${membros[0]}`)
      .addField("Novo Nome:", `${membros[1]}`)
      .addField("ID:", `${membros[2]}`)
      .setColor(client.cor)
      .setTimestamp();

    client.channels.cache.get("960575834727542884").send(MembroNickEmbed);
  }
  
};