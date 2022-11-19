const { kapsentcik, voiceUser } = require("../../../Helpers/Schemas");
class voiceReward {
  Event = "voiceStateUpdate"
  async run(newState, oldState) {
const kapsent = await kapsentcik.findOne({ guildID: config.guildID})
const voiceData = await voiceUser.findOne({ guildID: config.guildID, userID: oldState.id });
if (!kapsent.levelLog) return;
if(voiceData) {
if(voiceData.topStat >= 360000000) {
if(oldState.member.roles.cache.has(kapsent.vBronz) || oldState.member.roles.cache.has(kapsent.vGumus) || oldState.member.roles.cache.has(kapsent.vAltin) || oldState.member.roles.cache.has(kapsent.vElmas)) return;
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Bronz** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(kapsent.vBronz)
}
if(voiceData.topStat >= 1080000000) {
if(oldState.member.roles.cache.has(kapsent.vGumus) || oldState.member.roles.cache.has(kapsent.vAltin) || oldState.member.roles.cache.has(kapsent.vElmas)) return;
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Gümüş** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(kapsent.vGumus)
oldState.member.roles.remove(kapsent.vBronz)
}
if(voiceData.topStat >= 2700000000) {
if(oldState.member.roles.cache.has(kapsent.vAltin) || oldState.member.roles.cache.has(kapsent.vElmas)) return;
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Altın** rolüne sahip olmanızı sağladı!`)
oldState.id.roles.add(kapsent.vAltin)
oldState.member.roles.remove(kapsent.vGumus)
}
if(voiceData.topStat >= 7200000000) {
if(oldState.member.roles.cache.has(kapsent.vElmas)) return;
client.channels.cache.get(kapsent.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Elmas** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(kapsent.vElmas)
oldState.member.roles.remove(kapsent.vAltin)
}
}

   }  
}

module.exports = voiceReward