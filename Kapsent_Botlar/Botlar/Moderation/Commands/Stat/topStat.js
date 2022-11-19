const { kapsentcik, messageGuild, voiceGuild, messageUser, voiceUser } = require('../../../../Helpers/Schemas')
const moment = require("moment"); require("moment-duration-format");
class TopStat extends Command {
    constructor(client) {
        super(client, {
            name: "topstat",
            aliases: ["ts", "top"],
            cooldown: 10
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!kapsent.commandsChannel.some(kanal => message.channel.id.includes(kanal))) return message.reply(`**UYARI:** Bu komutu yalnızca <#${kapsent.commandsChannel[0]}> kanalında kullanabilirsin!`).sil(10)
        const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 }); const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 }); const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id }); const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id }); const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\`${index == 0 ? `1.` : `${index+1}.`}\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`); const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\`${index == 0 ? `1.` : `${index+1}.`}\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika] s [saniye]")}\``).join(`\n`); const mesaj = `Toplam üye mesajları: \`${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`\n\n${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`; const ses = `Toplam ses verileri: \`${moment.duration(voiceGuildData ? voiceGuildData.topStat : "Veri Bulunmuyor.").format("H [saat], m [dakika]")}\`\n\n${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
        message.channel.send({ embeds: [embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`:tada: Aşağıda \`${message.guild.name}\` Sunucusunun Genel Sıralaması Listelenmektedir`).addField(`Mesaj | Top 10`, `${mesaj}`).addField(`Ses | Top 10`, `${ses}`)] })
    }
}

module.exports = TopStat