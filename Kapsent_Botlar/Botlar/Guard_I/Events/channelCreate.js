const { kapsentcik, permis } = require("../../../Helpers/Schemas")
const { guvenli } = require("../../../Helpers/function")
class channelCreate {
  Event = "channelCreate"
  async run(channel) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.channelGuard === true) try {
        let entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        let islemyapan = channel.guild.members.cache.get(entry.executor.id);
        const channels = client.channels.cache.get(kapsent.guardLog)
        if (!channels) return;
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('yasakkaldir').setLabel("Yasağı Kaldır!").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('guvenliekle').setLabel("Güvenli Listeye Ekle!").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('ytleriac').setLabel("Yetkileri Tekrar Aç!").setStyle('DANGER'));
        let log = await channels.send({ content: `@everyone **Şüpheli İşlem Tespit Edildi!**\n\n**İŞLEM :** \`KANAL OLUŞTURMA İŞLEMİ!\`\n\n**Kanalı Oluşturan Kullanıcı: **${entry.executor} (\`${entry.executor.tag} - ${entry.executor.id}\`)\n\n**Yapılan İşlem :** ${islemyapan.bannable ? "Başarıyla yasaklandı" : "Yasaklanamadı"} - Kanalı sildim!`, components: [row] })
        var filter = (button) => config.Founders.some(x => x == button.user.id); const collector = log.createMessageComponentCollector({ filter }); collector.on('collect', async (button, user) => { const permisi = await permis.findOne({ guildID: config.guildID }); if (button.customId === "yasakkaldir") { button.guild.members.unban(entry.executor.id, ` Buton Üzerinden Kaldırıldı!`); button.reply(`Merhaba ${button.user}! ${entry.executor} kişisinin banı kaldırıldı!`) } if (button.customId === "guvenliekle") { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { WhiteListMembers: entry.executor.id } }, { upsert: true }); button.reply(`Merhaba ${button.user}! Başarılı bir şekilde ${entry.executor} kişisini güvenli listeye ekledim!`) }; if(button.customId === "ytleriac") { button.reply(`Merhaba ${button.user}! Yetkileri tekrar açtım!`); permisi.roller.forEach((permission) => { const role = button.guild.roles.cache.get(permission.rol); if (role) role.setPermissions(permission.perm); }); } })
    } catch (error) { console.log(`Etkinlik : Channel Create - Hata : ` + error) }
  }
}

module.exports = channelCreate