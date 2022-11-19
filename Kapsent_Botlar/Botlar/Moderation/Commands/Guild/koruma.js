const { kapsentcik} = require("../../../../Helpers/Schemas")
class Settings extends Command {
    constructor(client) {
        super(client, {
            name: "ayar",
            aliases: ["ayarlar","ayar","settings","koruma"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('serverguard').setLabel(`Sunucu Koruma ${kapsent.serverGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('channelguard').setLabel(`Kanal Koruma ${kapsent.channelGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('roleguard').setLabel(`Rol Koruma ${kapsent.roleGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('urlguard').setLabel(`URL Koruma ${kapsent.urlGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('tacguard').setLabel(`Taç Guard ${kapsent.tacGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'),)
        const row2 = new Discord.MessageActionRow().addComponents( new Discord.MessageButton().setCustomId('taglialim').setLabel(`Taglı Alım ${kapsent.tagliAlim ? '🟢' : '🔴'}`).setStyle('PRIMARY'),)
        let settings = await message.channel.send({ embeds: [embed.setDescription(`**${message.author}** Aşağıdaki butonlardan Sunucu Korumasını Açık/Kapalı Olarak Seçebilirsiniz!`)], components: [row, row2] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = settings.createMessageComponentCollector({ filter })
        collector.on('collect', async (button, user) => {
            if (button.customId === "serverguard") {
                if (kapsent.serverGuard === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { serverGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Sunucu Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.serverGuard === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { serverGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Sunucu Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "roleguard") {
                if (kapsent.roleGuard === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { roleGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Rol Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.roleGuard === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { roleGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Rol Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "channelguard") {
                if (kapsent.channelGuard === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { channelGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Kanal Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.channelGuard === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { channelGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Kanal Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "urlguard") {
                if (kapsent.urlGuard === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { urlGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Url Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.urlGuard === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { urlGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Url Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "tacguard") {
                if (kapsent.tacGuard === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { tacGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taç Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.tacGuard === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { tacGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taç Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "taglialim") {
                if (kapsent.tagliAlim === true) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { tagliAlim: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` kapatıldı! ${emojis.onay}`)
                } else if (kapsent.tagliAlim === false) {
                    await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { tagliAlim: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` açıldı! ${emojis.onay}`)
                }
            }
        })
    }
};

module.exports = Settings