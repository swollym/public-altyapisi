const { kapsentcik, messageUser } = require("../../../Helpers/Schemas");
class Message {
  Event = "messageCreate"
  async run(message) {
const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
const mesajData = await messageUser.findOne({ guildID: config.guildID, userID: message.author.id });
if (!kapsent.levelLog) return;
if(mesajData) {
if(mesajData.topStat == 1000) {
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Bronz** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(kapsent.cBronz)
}
if(mesajData.topStat == 5000) {
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Gümüş** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(kapsent.cGumus)
message.member.roles.remove(kapsent.cBronz)
}
if(mesajData.topStat == 10000) {
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Altın** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(kapsent.cAltin)
message.member.roles.remove(kapsent.cGumus)
}
if(mesajData.topStat == 50000) {
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Elmas** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(kapsent.cElmas)
message.member.roles.remove(kapsent.cAltin)
}
}
}
}


module.exports = Message