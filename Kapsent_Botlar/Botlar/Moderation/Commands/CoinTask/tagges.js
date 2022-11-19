const { kapsentcik, Users, coin } = require('../../../../Helpers/Schemas')
class Tagges extends Command {
    constructor(client) {
        super(client, {
            name: "taglı",
            aliases: ["tagges", "tagaldır", "tagaldir"],
            cooldown: 10
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!kapsent.commandsChannel.some(kanal => message.channel.id.includes(kanal))) return message.reply(`**UYARI:** Bu komutu yalnızca <#${kapsent.commandsChannel[0]}> kanalında kullanabilirsin!`).sil(10)
        if (!message.member.roles.cache.has(kapsent.registerHammer) && !config.Founders.includes(message.member)) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanmak için yeterli yetkin bulunmamakta!`)] }).sil(20)
        if (!member) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bir üye belirtmeyi unuttun!`)] }).sil(20)
        if (member.id === message.author.id) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Kendinin üzerinde işlem yapamazsın!`)] }).sil(20);
        if (!kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == kapsent.tags.filter(discrim => !isNaN(discrim))[0]) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Belirttiğin kişi tagımızı taşımıyor!`)] }).sil(20);
        let veri = await Users.findOne({ Taggeds: { $elemMatch: { userID: member.id } } })
        if (veri && veri.Taggeds.filter(a => a.userID === member.id)) {
            return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Belirttiğin üye \`${(veri.Taggeds.filter(e => e.userID === member.id).map(e => new Date(e.date).toTurkishFormatDate()))}\` tarihinde başka bir yetkili tarafından taglı olarak belirlenmiş!`)] }).sil(20)
        } else {
            const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('onayla').setLabel(`Evet`).setStyle('SUCCESS'), new Discord.MessageButton().setCustomId('iptalet').setLabel(`Hayır`).setStyle('DANGER'))
            let msg = await message.channel.send({ embeds: [embed.setDescription(`${member} Merhaba! ${message.author} sizi taglı olarak belirtmek istiyor. Onaylıyor musunuz?`).setFooter(`İstek 30 saniye içerisinde iptal edilecektir.`)], components: [row], content: `${member}` })
            var filter = (button) => button.user.id === member.user.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
            collector.on('collect', async (button, user) => {
                if (button.customId === "onayla") {
                    if (msg) msg.delete().catch(err => { });
                    await button.reply({ content: `${member} kişisi taglı isteğinizi onayladı! ${emojis.onay}` }).sil(20)
                    await Users.findOneAndUpdate({ userID: message.author.id }, { $push: { Taggeds: { userID: member.id, date: Date.now() } } }, { upsert: true });
                    client.channels.cache.get(kapsent.tagLog).send({ embeds: [embed.setDescription(`${member} kişisi ${message.author} yetkilisi tarafından **${new Date(message.createdAt).toTurkishFormatDate()}** tarihinde taglı olarak belirlendi!`).setFooter("Developed By kapsent.")] })
                    if (kapsent.coinSystem) await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { coin: config.taggedCoin } }, { upsert: true });
                    message.member.updateTask(message.guild.id, "taglı", 1, message.channel);

                }
                if (button.customId === "iptalet") {
                    if (msg) msg.delete().catch(err => { });
                    await button.reply({ content: `${member} kişisi istediğinizi onaylamadı!` }).sil(20);
                }
            })
            collector.on("end", async (collected, button) => {
                if (collected.size == 0) {
                    if (msg) msg.delete().catch(err => { });
                    await button.reply({ content: `${message.author} ${member} kişisi 30 saniye içerisinde cevap vermediği için işlem iptal edildi!` }).sil(20)
                }
            })
        }
    }
}

module.exports = Tagges