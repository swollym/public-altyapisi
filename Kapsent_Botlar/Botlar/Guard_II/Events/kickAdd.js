const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { ytKapat, guvenli } = require("../../../Helpers/function")
class guildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.serverGuard === true) try {
        let entry = await member.guild.fetchAuditLogs({ type: 'MEMBER_KICK' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        ytKapat(config.guildID)   
      } catch (error) { console.log(`Etkinlik : Kick Add - Hata : ` + error) }
  }
}

module.exports = guildMemberRemove