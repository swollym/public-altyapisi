const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { guvenli } = require("../../../Helpers/function")
class guildBanAdd {
  Event = "guildBanAdd"
  async run(ban) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.serverGuard === true) try {
        let entry = await ban.guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        let islemyapan = ban.guild.members.cache.get(entry.executor.id);
        const channels = client.channels.cache.get(kapsent.guardLog)
        if (!channels) return;
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('cezalikaldır').setLabel("Cezalı Kaldır!").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('guvenliekle').setLabel("Güvenli Listeye Ekle!").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('ytleriac').setLabel("Yetkileri Tekrar Aç!").setStyle('DANGER'));
        let log = await channels.send({ content: `@everyone **Şüpheli İşlem Tespit Edildi!**\n\n**İŞLEM :** \`İZİNSİZ ÜYE BANLAMA İŞLEMİ!\`\n\n**Üye Banlayan Kullanıcı: **${entry.executor} (\`${entry.executor.tag} - ${entry.executor.id}\`)\n**Banlanan Üye: **${ban.user} (\`${ban.user.tag} - ${ban.user.id}\`)\n\n**Yapılan İşlem :** ${islemyapan.manageable ? "Başarıyla cezalıya atıldı" : "Cezalıya Atılamadı"} - Kişiyi cezalıya attım ve banı açtım!`, components: [row] })
        var filter = (button) => config.Founders.some(x => x == button.user.id); const collector = log.createMessageComponentCollector({ filter }); collector.on('collect', async (button, user) => { const permisi = await permis.findOne({ guildID: config.guildID }); if (button.customId === "cezalikaldır") { islemyapan.roles.set([kapsent.unregisterRole], `Buton üzerinden cezalıdan çıkarıldı!`); button.reply(`Merhaba ${button.user}! ${entry.executor} kişisinin cezası kaldırıldı!`) } if (button.customId === "guvenliekle") { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { WhiteListMembers: entry.executor.id } }, { upsert: true }); button.reply(`Merhaba ${button.user}! Başarılı bir şekilde ${entry.executor} kişisini güvenli listeye ekledim!`) }; if(button.customId === "ytleriac") { button.reply(`Merhaba ${button.user}! Yetkileri tekrar açtım!`); permisi.roller.forEach((permission) => { const role = button.guild.roles.cache.get(permission.rol); if (role) role.setPermissions(permission.perm); }); } })
    } catch (error) { console.log(`Etkinlik : Ban Add - Hata : ` + error) }
  }
}

module.exports = guildBanAdd