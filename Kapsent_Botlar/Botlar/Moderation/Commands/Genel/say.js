const { kapsentcik } = require('../../../../Helpers/Schemas')
class Say extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: ["say"],
            cooldown: 30
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        var takviye = message.guild.premiumSubscriptionCount
        var üyesayısı = message.guild.members.cache.size
        var sesdekiler = message.guild.members.cache.filter((x) => x.voice.channel).size
        var aktif = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size
        let etiket = kapsent.tags.filter(discrim => !isNaN(discrim))[0]
        var Taglı = `${message.guild.members.cache.filter(x => kapsent.tags.some(tag => x.user.username.includes(tag)) || x.user.discriminator == etiket).size}`
        message.channel.send({ embeds: [embed.setDescription(
        `\`•\` Sunucudaki Toplam **${üyesayısı}** Kullanıcı bulunmakta.
        \`•\` Ses kanallarında toplam **${sesdekiler}** Kullanıcı bulunmaktadır.
        \`•\` Tagımızı alan **${Taglı}** kullanıcı bulunmakta.
        \`•\` Sunucumuza toplamda **${takviye}** boost basılmış.`)]})
   
    }
}

module.exports = Say