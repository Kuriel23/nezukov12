module.exports = {
  name: "watchdogs",
  type: "message",
};

module.exports.run = async (message, client) => {

  if (message.member.hasPermission("BAN_MEMBERS")) return 0;

  let convite =
    /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/gi.test(
      message.content
    );

  if (convite === true) {
    const inviteCodeRegexResult =
      /((discord|invite)\.(gg|io|me|plus|link|io|gg)|discordapp\.com\/invite)\/?([a-zA-Z0-9-]{2,32})/gi.exec(
        message.content
      );
    const code = inviteCodeRegexResult && inviteCodeRegexResult[4];
    const dosv = await message.guild.fetchInvites();
    if (code && dosv.has(code)) return 0;

    message.delete();
    message.reply(
      "O seu invite foi removido, aconselho a ler as <#675089976593088517> para evitar acontecer futuras punições!"
    );
    let reason = "Invite de outro servidor!";
    client.db.Users.findOne({ _id: message.author.id }, function (err, doc) {
      if (doc) {
        doc.punishments.autobot.push(reason);
        doc.save();
      }
      if (!doc) {
        const docToSave = new client.db.Users({
          _id: message.author.id,
          punishments: { autobot: [reason] },
        });
        docToSave.save();
      }
    });
  }
};
