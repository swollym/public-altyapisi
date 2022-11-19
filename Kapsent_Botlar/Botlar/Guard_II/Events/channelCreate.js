const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { ytKapat, guvenli } = require("../../../Helpers/function")
class channelCreate {
  Event = "channelCreate"
  async run(channel) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.channelGuard === true) try {
        let entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        ytKapat(config.guildID)  
      } catch (error) { console.log(`Etkinlik : Channel Create - Hata : ` + error) }
  }
}

module.exports = channelCreate