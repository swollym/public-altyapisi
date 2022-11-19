const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { ytKapat, guvenli } = require("../../../Helpers/function")
class channelUpdate {
  Event = "channelUpdate"
  async run(newChannel, oldChannel) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.channelGuard === true) try {
        let entry = await newChannel.guild.fetchAuditLogs({ type: 'CHANNEL_UPDATE' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || !newChannel.guild.channels.cache.has(newChannel.id) || await guvenli(entry.executor.id)) return;
        ytKapat(config.guildID) 
      } catch (error) { console.log(`Etkinlik : Channel Update - Hata : ` + error) }
  }
}

module.exports = channelUpdate