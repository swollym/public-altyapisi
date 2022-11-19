const Discord = require("discord.js");
const { kapsentcik } = require("../../../Helpers/Schemas")
class UserUpdate {
    Event = "userUpdate"
    async run(old, nev) {
        const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
        const guild = client.guilds.cache.get(config.guildID)
        let user = guild.members.cache.get(old.id);
        if (!user) return;
        if (!guild) return;
        if (old.discriminator == nev.discriminator || old.bot || nev.bot) {
            return;
        } else try {
            let etiket = kapsent.tags.filter(discrim => !isNaN(discrim))[0]
            if (nev.discriminator !== old.discriminator) {
                if (kapsent?.etiketTag && old.discriminator == etiket && nev.discriminator !== etiket) {
                    user.setRoles(kapsent.unregisterRole).catch(e => { }); user.roles.add(kapsent.etkinlikRole); user.roles.add(kapsent.cekilisRole); user.setNickname(`İsim | Yaş`)
                    if (log) log.send(`${uye}, adlı üye tagımızı kullanıcı adından silerek aramızdan ayrıldı!\n\n─────────────────\n\nÖnce ${old.tag} | Sonra: ${nev.tag}`)
                } else if (old.discriminator !== etiket && nev.discriminator == etiket) {
                    user.roles.add(kapsent?.tagRol).catch(err => { })
                    if (log) log.send(`${user}, adlı üye tagımızı kullanıcı adına ekleyerek ailemize katıldı!\n\n─────────────────\n\nÖnce: ${old.tag} | Sonra: ${nev.tag}`)
                }
            }

        } catch (error) {
            client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
        }
    }
}

module.exports = UserUpdate