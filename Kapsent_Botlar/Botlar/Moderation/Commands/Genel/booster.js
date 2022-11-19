const { kapsentcik, Users } = require('../../../../Helpers/Schemas')
class Booster extends Command {
    constructor(client) {
        super(client, {
            name: "booster",
            aliases: ["boosterisim", "zengin", "bn", "zn"],
            cooldown: 30
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!kapsent.commandsChannel.some(kanal => message.channel.id.includes(kanal))) return message.reply(`**UYARI:** Bu komutu yalnızca <#${kapsent.commandsChannel[0]}> kanalında kullanabilirsin!`).sil(10)
        if (!message.member.roles.cache.has(kapsent.boosterRole)) return message.reply({ embeds: [embed.setDescription(`**UYARI :** İsmini değiştirmek için \`Booster\` olmanız gerekmekte!`)] }).sil(10)
        const member = message.member;
        let isim = args.join(' ');
        if (!isim) return message.reply({ embeds: [embed.setDescription(`**UYARI :** Bir isim belirtmeyi unuttun!`)] }).sil(20)
        if (isim.length > 30) return message.reply({ embeds: [embed.setDescription(`**UYARI :** Belirttiğiniz isim Discord API sınırına ulaştı!`)] }).sil(20)
        if (!member.manageable) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`\`iptal:\` Kullanıcı adını değiştirmek için yeterli yetkim yok ${emojis.iptal}`).setColor("RANDOM")] });
        let setName;
        if (member.manageable) {
            if (inviteEngel.test(isim)) {
                if (message) message.delete()
                return message.reply({ embeds: [embed.setDescription(`İsminiz küfür, link veya discord linki içeremez ${emojis.iptal}`)] }).sil(20)
            } else {
                setName = `${kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == kapsent.tags.filter(t => t.startsWith("#")) ? kapsent.isimsembol : (kapsent.isimsemboliki ? kapsent.isimsemboliki : kapsent.isimsembol)} ${isim}`
                await member.setNickname(`${setName}`)
                message.reply({ embeds: [embed.setDescription(`İsminiz başarıyla \`${setName}\` olarak değiştirildi ${emojis.onay}`)] }).sil(20)
                await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `${isim}`, islem: "Booster İsim Değiştirme" } } }, { upsert: true });
            }
        }
    }
}

module.exports = Booster