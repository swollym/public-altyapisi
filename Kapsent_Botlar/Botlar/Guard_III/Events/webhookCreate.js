const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { guvenli } = require("../../../Helpers/function")
class webhookUpdate {
  Event = "webhookUpdate"
  async run(channel) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.serverGuard === true) try {
        const entry = await channel.guild.fetchAuditLogs({ type: 'WEBHOOK_CREATE' }).then(audit => audit.entries.first())
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        let islemyapan = channel.guild.members.cache.get(entry.executor.id);
        if (islemyapan.manageable && kapsent.jailedRole) islemyapan.roles.set([kapsent.jailedRole], { reason: "Webhook Oluşturduğu İçin Cezalıya Atıldı!" }).catch(error => console.log(`Etkinlik: Webhook Create \nHata: ` + error + ``)) 
        if (entry.target) await entry.target.delete()
     } catch (error) { console.log(`Etkinlik : Webhook Create - Hata : ` + error) }
  }
}

module.exports = webhookUpdate