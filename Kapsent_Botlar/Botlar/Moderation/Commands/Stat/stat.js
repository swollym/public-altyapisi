const { kapsentcik, messageUserChannel, voiceUserChannel, messageUser, voiceUser } = require('../../../../Helpers/Schemas')
const moment = require("moment"); require("moment-duration-format");
class Stat extends Command {
    constructor(client) {
        super(client, {
            name: "stat",
            aliases: ["me", "user"],
            cooldown: 10
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!kapsent.commandsChannel.some(kanal => message.channel.id.includes(kanal))) return message.reply(`**UYARI:** Bu komutu yalnızca <#${kapsent.commandsChannel[0]}> kanalında kullanabilirsin!`).sil(10)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 }); const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 }); let mesajVeri = Active1.length > 0 ? Active1.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map(x => `${emojis.nokta} \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."; let sesVeri = Active2.length > 0 ? Active2.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map(x => `${emojis.nokta} <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."; const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id }); const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
        message.channel.send({ embeds: [embed.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${emojis.star} ${member} adlı üyenin \`${message.guild.name}\` Sunucusundaki verilere göre hesaplanan istatistik verileri; \n\n${emojis.kanal} **Genel Toplam Chat :** \`${Number(messageData ? messageData.topStat : 0).toLocaleString()} mesaj\`\n${emojis.voice} **Genel Toplam Ses : **\`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`\n\n${emojis.kanal} **Haftalık Chat Verileri :** \`${Number(messageData ? messageData.weeklyStat : 0).toLocaleString()} mesaj\`\n${emojis.voice} **Haftalık Ses Verileri :** \`${moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]")}\``).addField(`Genel Sohbet Bilgisi : `, `${mesajVeri}`).addField(`Genel Ses Bilgisi : `, `${sesVeri}`)] })
    }
}

module.exports = Stat