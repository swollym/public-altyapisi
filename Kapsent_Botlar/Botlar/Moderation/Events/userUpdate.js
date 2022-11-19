const Discord = require("discord.js");
const { kapsentcik } = require("../../../Helpers/Schemas")
class UserUpdate {
    Event = "userUpdate"
    async run(old, nev) {
        const guild = client.guilds.cache.get(config.guildID)
        if (!guild) return;
        if (old.username == nev.username || old.bot || nev.bot) {
            return;
        } else try {
            const kapsent = await kapsentcik.findOne({ guildID: config.guildID }); let guild = await (client.guilds.cache.get(config.guildID)); let uye = guild.members.cache.get(old.id); let tagrol = guild.roles.cache.get(kapsent.tagRol); let log = guild.channels.cache.get(kapsent.tagLog)
            if (old.username != nev.username || old.tag != nev.tag || old.discriminator != nev.discriminator) {
                if (kapsent.tags.some(tag => nev.tag.toLowerCase().includes(tag))) {
                    if (!uye.roles.cache.has(tagrol.id)) {
                        uye.roles.add(tagrol.id).catch(e => { }); if (log) log.send(`${uye}, adlı üye **( ${kapsent.tags.filter(a => uye.user.username.includes(a) || uye.user.discriminator == a.replace("#", "")).map(a => a).join(", ")} )** tagını kullanıcı adına ekleyerek ailemize katıldı!\n\n─────────────────\n\nÖnce: ${old.tag} | Sonra: ${nev.tag}`)
                    } else { return; }
                } else {
                    if (!uye.roles.cache.has(tagrol.id)) {
                        return;
                    } else { uye.setRoles(kapsent.unregisterRole).catch(e => { }); uye.roles.add(kapsent.etkinlikRole); uye.roles.add(kapsent.cekilisRole); uye.setNickname(`${kapsent.isimsemboliki} İsim | Yaş`); if (log) log.send(`${uye}, adlı üye **( ${kapsent.tags.filter(a => uye.user.username.includes(a) || uye.user.discriminator == a.replace("#", "")).map(a => a).join(", ")} )** tagını kullanıcı adından silerek aramızdan ayrıldı!\n\n─────────────────\n\nÖnce ${old.tag} | Sonra: ${nev.tag}\n`) }
                }
            }

        } catch (error) {
            client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
        }
    }
}

module.exports = UserUpdate