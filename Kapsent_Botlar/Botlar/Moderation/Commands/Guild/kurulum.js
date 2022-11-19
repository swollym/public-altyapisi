const { kapsentcik, roleBackup } = require("../../../../Helpers/Schemas")
const { Database } = require("ark.db")
const emojiDB = new Database("../../../../Settings/emojis.json")
class Kurulum extends Command {
    constructor(client) {
        super(client, {
            name: "kurulum",
            aliases: ["kurulum", "kurulum"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        const secim = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setPlaceholder('Kuruluma Başla!').setCustomId('kurulumselect').addOptions([{ label: "Emoji Kur!", description: "Emoji kurulum yap!", value: "emojikur" }, { label: "EC Rol Alma Kur!", description: "Rol alma Kur!", value: "ecrolalmakur" }, { label: "Kullanıcı Panel Kur!", description: "Kullanıcı Panel kur!", value: "kullanicipanel" }, { label: "Log Kanalları Kur!", description: "Log Kanalları kurulumu yap!", value: "logkanalkur" }, { label: "Level Sistemi!", description: "Level Sistemi Kur!", value: "levelsistemi" },{ label: "Sunucu içi Kurulum!", description: "Sunucu için Rol/Kanal/... kurulum yap!", value: "sunucuk" }, { label: "Kapat!", description: "Menüyü kapatmak için tıkla!", value: "menukapat" }]));
        let kurulum = await message.channel.send({ components: [secim], embeds: [embed.setDescription(`Merhaba! **${message.author}** **${message.guild.name}** Sunucusu kurulum ekranına hoş geldin! \n\n:white_small_square: Aşağıdaki menüden kurmak istediğin kısmı seç ve gerisini bana bırak!`)] })
        kurulum.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU', }).then(async (interaction) => {
            if (interaction.values[0] == "emojikur") {
                if (kurulum) kurulum.delete();
                interaction.channel.send(`Emoji kurulumları başarıyla başladı..`).sil(10)
                const emojis = [
                    { name: "iptal", url: "https://cdn.discordapp.com/emojis/1007209617325039616.png" },
                    { name: "onay", url: "https://cdn.discordapp.com/emojis/1007209376513265695.png" },
                    { name: "cmute", url: "https://cdn.discordapp.com/emojis/1007232183238397982.png" },
                    { name: "vmute", url: "https://cdn.discordapp.com/emojis/1007232181665533952.png" },
                    { name: "cmd", url: "https://cdn.discordapp.com/emojis/1007234423332274287.png" },
                    { name: "hata", url: "https://cdn.discordapp.com/emojis/1007209617325039616.png" },
                    { name: "jail", url: "https://cdn.discordapp.com/emojis/1007231748490416178.png" },
                    { name: "star", url: "https://cdn.discordapp.com/emojis/1007236859908333619.gif" },
                    { name: "join", url: "https://cdn.discordapp.com/emojis/1007212958369198090.png" },
                    { name: "left", url: "https://cdn.discordapp.com/emojis/1007212959711363133.png" },
                    { name: "nokta", url: "https://cdn.discordapp.com/emojis/1007213387584913428.png" },
                    { name: "ban", url: "https://cdn.discordapp.com/emojis/1007231380851261521.gif" },
                    { name: "fill", url: "https://cdn.discordapp.com/emojis/836740227421700103.gif?v=1" },
                    { name: "kanal", url: "https://cdn.discordapp.com/emojis/1007259530679304293.png" },
                    { name: "voice", url: "https://cdn.discordapp.com/emojis/1007259680109760553.png" },
                    { name: "empty", url: "https://cdn.discordapp.com/emojis/836740057582534686.png?v=1" },
                    { name: "fillStart", url: "https://cdn.discordapp.com/emojis/836740289841463336.gif?v=1" },
                    { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/836740118092972062.png?v=1" },
                    { name: "kapsent_nitro", url: "https://cdn.discordapp.com/emojis/1006324897779294288.png" },
                    { name: "kapsent_youtube", url: "https://cdn.discordapp.com/emojis/1006324896055443576.gif" },
                    { name: "kapsent_spotify", url: "https://cdn.discordapp.com/emojis/686036837596397579.png" },
                    { name: "kapsent_netflix", url: "https://cdn.discordapp.com/emojis/1006324894373515304.png" },
                    { name: "kapsent_exxen", url: "https://cdn.discordapp.com/emojis/1006324891844358327.png" },
                    { name: "kapsent_blutv", url: "https://cdn.discordapp.com/emojis/995761579398266930.png" },
                    { name: "kapsent_micon", url: "https://cdn.discordapp.com/emojis/1007654069067862046.webp?size=96&quality=lossless" },
                    { name: "kapsent_micoff", url: "https://cdn.discordapp.com/emojis/1007654103930900561.webp?size=96&quality=lossless" },
                    { name: "kapsent_yayinon", url: "https://cdn.discordapp.com/emojis/994250257544249474.webp?size=96&quality=lossless" },
                    { name: "kapsent_yayinoff", url: "https://cdn.discordapp.com/emojis/994250497550721094.webp?size=96&quality=lossless" },
                ]
                emojis.forEach(async (x) => {
                    if (message.guild.emojis.cache.find((e) => x.name === e.name)) return emojiDB.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
                    const emoji = await message.guild.emojis.create(x.url, x.name);
                    await emojiDB.set(x.name, emoji.toString());
                    message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
                })
            }
            if (interaction.values[0] == "ecrolalmakur") {
                if (!kapsent.cekilisRole || !kapsent.etkinlikRole || !kapsent.ecChannel) return interaction.channel.send(`**UYARI :** Verilerimde \`Çekiliş Katılımcısı veya Etkinlik katılımcısı veya Rol Alma kanalını bulamadım. Kontrol edip tekrar deneyiniz!\` `).sil(5)
                if (kurulum) kurulum.delete();
                interaction.channel.send(`Merhaba! Etkinlik - Çekiliş katılımcısı rol alma kurulumu tamamlandı!`).sil(10)
                const ecrolalmas = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('etkinlikrol').setLabel("Etkinlik Katılımcısı").setEmoji("904403680449667122").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('cekilisrol').setLabel("Çekiliş Katılımcısı").setEmoji("740684333370703923").setStyle('DANGER'));
                let context = `Merhaba değerli **${message.guild.name}** üyeleri,
 
Çekiliş Katılımcısı alarak ${emojis.kapsent_nitro},  ${emojis.kapsent_youtube},  ${emojis.kapsent_netflix},  ${emojis.kapsent_spotify}, ${emojis.kapsent_blutv}, ${emojis.kapsent_exxen}  gibi çeşitli ödüllerin sahibi olabilirsiniz.
Etkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.
                
__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__
                `
                if (kapsent.ecChannel) client.channels.cache.get(kapsent.ecChannel).send({ content: `${context}`, components: [ecrolalmas] })
            }
            if (interaction.values[0] == "kullanicipanel") {
                if (!kapsent.kullaniciPanelChannel) return interaction.channel.send(`**UYARI :** Verilerimde Kullanıcı Panel sistemi için kanalı bulamadım! Lütfen kontrol edip tekrar deneyiniz!`)
                if (kurulum) kurulum.delete();
                interaction.channel.send(`Merhaba! Kullanıcı Panel sistemi kurulumu tamamlandı!`).sil(10)
                const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('katilma').setLabel("I").setStyle('DANGER'), new Discord.MessageButton().setCustomId('isim').setLabel("II").setStyle('DANGER'), new Discord.MessageButton().setCustomId('ceza').setLabel("III").setStyle('DANGER'),);
                const row1 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('davet').setLabel("IV").setStyle('DANGER'), new Discord.MessageButton().setCustomId('roller').setLabel("V").setStyle('DANGER'), new Discord.MessageButton().setCustomId('tarih').setLabel("VI").setStyle('DANGER'),);
                const row2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('kayitsiz').setLabel("VII").setStyle('DANGER'), new Discord.MessageButton().setCustomId('mesaj').setLabel("VIII").setStyle('DANGER'), new Discord.MessageButton().setCustomId('sescik').setLabel("IX").setStyle('DANGER'),);
                let content = `Merhaba **${message.guild.name}**! Aşağıdan sunucu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olacaktır!\n\n**I :** \`Sunucuya katılma tarihinizi gösterir.\`\n**II :** \`İsim geçmişinizi gösterir.\`\n**III :** \`Ceza puanınızı gösterir.\`\n\n**IV :** \`Davet bilgilerinizi gösterir.\`\n**V :** \`Sahip olduğunuz rolleri gösterir.\`\n**VI :** \`Hesabınızın oluşturulma tarihini gösterir.\`\n\n**VII :** \`Kayıtsıza atılın ve yeniden kayıt olun.\`\n**VIII :** \`Mesaj istatistiklerinizi gösterir.\`\n**IX :** \`Ses istatistiklerinizi gösterir.\``
                if (kapsent.kullaniciPanelChannel) client.channels.cache.get(kapsent.kullaniciPanelChannel).send({ content: `${content}`, components: [row, row1, row2] })
            }
            if (interaction.values[0] == "sunucuk") {
                if (kurulum) kurulum.delete();
                const ecrolalmas = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('kapsent').setLabel("kapsent").setEmoji("904403680449667122").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('kapsent').setLabel("kapsent").setEmoji("740684333370703923").setStyle('SUCCESS'));
                interaction.channel.send (`Merhaba kapsent - kapsent sunucu içi kuruluma başlamak için \`!setup\` komutunu kullanmalısın ardından menü seni yönlendiricektir Kolay Gelsin.`)
                
                if (kapsent.ecChannel) client.channels.cache.get(kapsent.ecChannel).send({ content: `${context}`, components: [ecrolalmas] })
            }
            if (interaction.values[0] == "logkanalkur") {
                if (kurulum) kurulum.delete();
                interaction.channel.send({embeds: [embed.setDescription(`Başarıyla log kanalları kurulmaya başlandı.
                
                Kurulan Log Kanalları:
                \`1.\` Ban Bilgi
                \`2.\` Jail Bilgi
                \`3.\` Chat Mute Bilgi
                \`4.\` Voice Mute Bilgi
                \`5.\` Tag Log Bilgi
                \`6.\` Ses Log Bilgi
                \`7.\` Mesaj Log Bilgi
                \`8.\` Komut Log Bilgi
                \`9.\` Rol Log Bilgi
                \`10.\` Denetim Log Bilgi
                \`11.\` YasaklıTag Log Bilgi
                \`12.\` Guard Log Bilgi
                \`13.\` Görev Log Bilgi


                `)]}).sil(10)
                const everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
                const logCategory = await message.guild.channels.create(`kapsent LOGS`, { type: 'GUILD_CATEGORY', });
                await logCategory.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
                const tagLog = await message.guild.channels.create(`tag-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagLog: tagLog.id } }, { upsert: true })
                const messageLog = await message.guild.channels.create(`message-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { messageLog: messageLog.id } }, { upsert: true })
                const voiceLog = await message.guild.channels.create(`voice-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { voiceLog: voiceLog.id } }, { upsert: true })
                const yasakTagLog = await message.guild.channels.create(`ytag-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { yasakTagLog: yasakTagLog.id } }, { upsert: true })
                const denetimLog = await message.guild.channels.create(`denetim-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { denetimLog: denetimLog.id } }, { upsert: true })
                const commandLog = await message.guild.channels.create(`commands-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { commandLog: commandLog.id } }, { upsert: true })
                const banLog = await message.guild.channels.create(`ban-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { banLog: banLog.id } }, { upsert: true })
                const muteLog = await message.guild.channels.create(`mute-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteLog: muteLog.id } }, { upsert: true })
                const jailLog = await message.guild.channels.create(`jail-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailLog: jailLog.id } }, { upsert: true })
                const guardLog = await message.guild.channels.create(`guard-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { guardLog: guardLog.id } }, { upsert: true })
                const missionLog = await message.guild.channels.create(`görev-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { dailyMissionLog: missionLog.id } }, { upsert: true })
                const rolLog = await message.guild.channels.create(`rol-log`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { rolLog: rolLog.id } }, { upsert: true })

            }
            if (interaction.values[0] == "levelsistemi") {
                const { Permissions } = require('discord.js');
                let info = message.guild.channels.cache.filter(x => x.name.toLocaleLowerCase().includes('info') || x.name.toLocaleLowerCase().includes("bilgi") || x.name.toLocaleLowerCase().includes("INFO") || x.name.toLocaleLowerCase().includes("ınfo")).map(x => x.id)[0] || undefined
                if (!info || info == undefined) {
                    message.channel.send({ content: `${emojis.iptal} **Information** kategorisini bulamadım! Bu yüzden kanalı açamadım! Lütfen kontrol ediniz ve \`kapsent\` ile iletişime geçiniz!` })
                    if (kurulum) kurulum.delete();
                    message.react(emojis.iptal)
                }
                message.react(emojis.onay)
                message.channel.send({ content: `Merhaba ${message.author}! Level rolleri ve kanalı kuruluyor. Sistem otomatik olarak aktif edilecektir!` }).sil(50)
                if (kurulum) kurulum.delete();
                const celmas = await message.guild.roles.create({ name: "🏆 Chat Elmas", reason: "Reward Sistem için Kurulum", color: "6a7e96", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const caltin = await message.guild.roles.create({ name: "🥇 Chat Altın", reason: "Reward Sistem için Kurulum", color: "ffd700", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const cgumus = await message.guild.roles.create({ name: "🥈 Chat Gümüş", reason: "Reward Sistem için Kurulum", color: "c0c0c0", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const cbronz = await message.guild.roles.create({ name: "🥉 Chat Bronz", reason: "Reward Sistem için Kurulum", color: "cd7f32", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const ayirma = await message.guild.roles.create({ name: "_______________", reason: "Reward Sistem için Kurulum" })
                const velmas = await message.guild.roles.create({ name: "🏆 Voice Elmas", reason: "Reward Sistem için Kurulum", color: "6a7e96", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const valtin = await message.guild.roles.create({ name: "🥇 Voice Altın", reason: "Reward Sistem için Kurulum", color: "ffd700", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const vgumus = await message.guild.roles.create({ name: "🥈 Voice Gümüş", reason: "Reward Sistem için Kurulum", color: "c0c0c0", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })
                const vbronz = await message.guild.roles.create({ name: "🥉 Voice Bronz", reason: "Reward Sistem için Kurulum", color: "cd7f32", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, })

                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cBronz: cbronz.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cGumus: cgumus.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cAltin: caltin.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cElmas: celmas.id } }, { upsert: true }).exec();

                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vBronz: vbronz.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vGumus: vgumus.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vAltin: valtin.id } }, { upsert: true }).exec();
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vElmas: velmas.id } }, { upsert: true }).exec();

                const levelLog = await message.guild.channels.create(`level-bilgi`, { type: 'GUILD_TEXT', }).then(async channel => await channel.setParent(info, { lockPermissions: true }));
                await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { levelLog: levelLog.id } }, { upsert: true })
            }
        })
    }
};

module.exports = Kurulum