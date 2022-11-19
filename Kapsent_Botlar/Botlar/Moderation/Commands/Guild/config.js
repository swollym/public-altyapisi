const { kapsentcik } = require("../../../../Helpers/Schemas")
class Setup extends Command {
    constructor(client) {
        super(client, {
            name: "config",
            aliases: ["config"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!args[0]) { 
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setCustomId('select').setPlaceholder('Kurumları Gör!').setCustomId('select').addOptions([{ label: "Yapılan Kurumlar!", description: "Tüm Kurulumları Bitirmeden Tıklamayınız.", value: `${message.guild.name}` }]));
        let kurulum = await message.channel.send({
            components: [row], embeds:
                [embed.setDescription(`Aşağıdaki Komutlardan Sunucu İç Kurulum YapaBilirsiniz.
                
                \`1 - Sunucu Tagı\`
                \`2 - Sunucu UnTag\`
                \`3 - Botses Kanal\`
                \`4 - Komut Kanal\`
                \`5 - Genel Sohbet\`
                \`6 - Welcome Kanalı\`
                \`7 - İnvite Log\`
                \`8 - Kayıtsız Rolü\`
                \`9 - Erkek Rolü\`
                \`10 - Kız Rolü\`
                \`11 - Vip Rolü\`
                \`12 - Register Hammer Rolü\`
                \`13 - Ban Hammer Rolü\`
                \`14 - Jail Hammer Rolü\`
                \`15 - Chat Mute Hammer Rolü\`
                \`16 - Voice Mute Hammer Rolü\`
                \`17 - Taglı Rolü\`
                \`18 - Booster Rolü\`
                \`19 - Etkinlik Rolü\`
                \`20 - Çekiliş Rolü\`
                \`21 - Yönetim Rolleri\`
                \`22 - Muted Rolü\`
                \`23 - Voice Muted Rolü\`
                \`24 - Cezalı Rolü\`
                \`25 - Rol Alma Kanalı\`
                \`26 - Public Kategorisi\`
                \`27 - Mute Log Kanalı\`
                \`28 - Ban Log Kanalı\`
                \`29 - Jail Log Kanalı\`
                \`30 - Voice Mute Log Kanalı\`
                \`31 - Rol Log Kanalı\`
                \`32 - Tag Log Kanalı\`
                \`33 - Mesaj Log Kanalı\`
                \`34 - Ses Log Kanalı\`
                \`35 - Denetim Log Kanalı\`
                \`36 - Guard Log Kanalı\`
                \`37 - Kullanıcı Panel Kanalı\`



                

                `
                )]
        })

        kurulum.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU', }).then(async (interaction) => {
            if (interaction.customId == "select") {
                let banhammer = kapsent.banHammer ? `<@&${kapsent.banHammer}>` : `${emojis.iptal}`;
                let jailhammer = kapsent.jailHammer ? `<@&${kapsent.jailHammer}>` : `${emojis.iptal}`;
                let mutehammer = kapsent.muteHammer ? `<@&${kapsent.muteHammer}>` : `${emojis.iptal}`;
                let vmutehammer = kapsent.vmuteHammer ? `<@&${kapsent.vmuteHammer}>` : `${emojis.iptal}`;
                let clownhammer = kapsent.clownHammer ? `<@&${kapsent.clownHammer}>` : `${emojis.iptal}`;
                let movehammer = kapsent.moveHammer ? `<@&${kapsent.moveHammer}>` : `${emojis.iptal}`;
                let registerhammer = kapsent.registerHammer ? `<@&${kapsent.registerHammer}>` : `${emojis.iptal}`;
                let vipRol = kapsent.vipRole ? `<@&${kapsent.vipRole}>` : `${emojis.iptal}`;
                let erkekrol = kapsent.manRoles ? `${kapsent.manRoles.length > 1 ? kapsent.manRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + kapsent.manRoles.map(x => `<@&${x}>`).slice(-1) : kapsent.manRoles.map(x => `<@&${x}>`).join("")}` : `${emojis.iptal}`;
                let kadınrol = kapsent.womanRoles ? `${kapsent.womanRoles.length > 1 ? kapsent.womanRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + kapsent.womanRoles.map(x => `<@&${x}>`).slice(-1) : kapsent.womanRoles.map(x => `<@&${x}>`).join("")}` : `${emojis.iptal}`;
                let yonetimRoles = kapsent.yonetimRoles ? `${kapsent.yonetimRoles.length > 1 ? kapsent.yonetimRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + kapsent.yonetimRoles.map(x => `<@&${x}>`).slice(-1) : kapsent.yonetimRoles.map(x => `<@&${x}>`).join("")}` : `${emojis.iptal}`;
                let kayitsizrol = kapsent.unregisterRole ? `<@&${kapsent.unregisterRole}>` : `${emojis.iptal}`; let tagrol = kapsent.tagRol ? `<@&${kapsent.tagRol}>` : `${emojis.iptal}`; let mutedrol = kapsent.mutedRole ? `<@&${kapsent.mutedRole}>` : `${emojis.iptal}`;
                let vmutedrol = kapsent.vmutedRole ? `<@&${kapsent.vmutedRole}>` : `${emojis.iptal}`;
                let cezalıRol = kapsent.jailedRole ? `<@&${kapsent.jailedRole}>` : `${emojis.iptal}`;
                let boosterRol = kapsent.boosterRole ? `<@&${kapsent.boosterRole}>` : `${emojis.iptal}`;
                let cekilisrol = kapsent.cekilisRole ? `<@&${kapsent.cekilisRole}>` : `${emojis.iptal}`;
                let etkinlikrol = kapsent.etkinlikRole ? `<@&${kapsent.etkinlikRole}>` : `${emojis.iptal}`;

                let banlog = kapsent.banLog ? `<#${kapsent.banLog}>` : `${emojis.iptal}`;
                let jaillog = kapsent.jailLog ? `<#${kapsent.jailLog}>` : `${emojis.iptal}`;
                let mutelog = kapsent.muteLog ? `<#${kapsent.muteLog}>` : `${emojis.iptal}`;
                let taglog = kapsent.tagLog ? `<#${kapsent.tagLog}>` : `${emojis.iptal}`;
                let denetimlog = kapsent.denetimLog ? `<#${kapsent.denetimLog}>` : `${emojis.iptal}`;
                let mesajlog = kapsent.messageLog ? `<#${kapsent.messageLog}>` : `${emojis.iptal}`;
                let seslog = kapsent.voiceLog ? `<#${kapsent.voiceLog}>` : `${emojis.iptal}`;
                let botses = kapsent.botVoiceChannel ? `<#${kapsent.botVoiceChannel}>` : `${emojis.iptal}`;
                let komutkanal = kapsent.commandsChannel ? `${kapsent.commandsChannel.length > 1 ? kapsent.commandsChannel.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + kapsent.commandsChannel.map(x => `<#${x}>`).slice(-1) : kapsent.commandsChannel.map(x => `<#${x}>`).join("")}` : `${emojis.iptal}`;
                let genelsohbet = kapsent.genelChat ? `<#${kapsent.genelChat}>` : `${emojis.iptal}`;
                let giriskanal = kapsent.welcomeChannel ? `<#${kapsent.welcomeChannel}>` : `${emojis.iptal}`;
                let invitelog = kapsent.inviteLog ? `<#${kapsent.inviteLog}>` : `${emojis.iptal}`;
                let rolLog = kapsent.rolLog ? `<#${kapsent.rolLog}>` : `${emojis.iptal}`;
                let ecrolalma = kapsent.ecChannel ? `<#${kapsent.ecChannel}>` : `${emojis.iptal}`;
                let kpanel = kapsent.kullaniciPanelChannel ? `<#${kapsent.kullaniciPanelChannel}` : `${emojis.iptal}`;
                let guardLog = kapsent.guardLog ? `<#${kapsent.guardLog}>` : `${emojis.iptal}`;
                let gunlukGorev = kapsent.dailyMissionLog ? `<#${kapsent.dailyMissionLog}>` : `${emojis.iptal}`

                let publicParent = kapsent.publicParents ? `<#${kapsent.publicParents}>` : `${emojis.iptal}`;


                if (kurulum) kurulum.delete(); await interaction.channel.send({
                    embeds: [embed.setDescription(`\` • \`Sunucu İsim: **${message.guild.name}**
                    \` • \` Sunucu Tag :**${kapsent.tags ? kapsent.tags.map(t => `${t}`).join(',') : `${emojis.iptal}`}**
                    \` • \` Sunucu İkinci Tag: **${kapsent.isimsemboliki}**

                    \` > \` **Sunucu İçi Perm Rolleri**

                    \` • \` Ban Hammer Rolü ${banhammer}
                    \` • \` Jail Hammer Rolü ${jailhammer}
                    \` • \` Chat Mute Hammer Rolü ${mutehammer}
                    \` • \` Voice Mute Hammer Rolü ${vmutehammer}
                    \` • \` Register Hammer Rolü ${registerhammer}

                    \` > \` **Sunucu İçi Rol Ayarları**

                    \` • \` Kayıtsız Rolü ${kayitsizrol}
                    \` • \` Erkek Rolü ${erkekrol}
                    \` • \` Kadın Rolü ${kadınrol}
                    \` • \` Yönetim Rolleri ${yonetimRoles}
                    \` • \` Taglı Rolü ${tagrol}
                    \` • \` Chat Muted Rolü ${mutedrol}
                    \` • \` Voice Muted Rolü ${vmutedrol}
                    \` • \` Cezalı Rolü ${cezalıRol}
                    \` • \` Booster Rolü ${boosterRol}
                    \` • \` Etkinlik Rolü ${etkinlikrol}
                    \` • \` Çekiliş Rolü ${cekilisrol}
                    \` • \` Vip Rolü ${vipRol}

                    \` > \` **Sunucu İçi Log Kanal Ayarları**

                    \` • \` Guard Log Kanalı ${guardLog}
                    \` • \` Ban Log Kanalı ${banlog}
                    \` • \` Jail Log Kanalı ${jaillog}
                    \` • \` Chat Mute Log Kanalı ${mutelog}
                    \` • \` Tag Log Kanalı ${taglog}
                    \` • \` Denetim Log Kanalı ${denetimlog}
                    \` • \` Mesaj Log Kanalı ${mesajlog}
                    \` • \` Ses Log Kanalı ${seslog}
                    \` • \` İnvite Log Kanalı ${invitelog}
                    \` • \` Rol Log Kanalı ${rolLog}
                    \` • \` Günlük Görev Kanalı ${gunlukGorev}

                    \` > \` **Sunucu İçi Kanal Ayarları**

                    \` • \` Bot Ses Kanalı ${botses}
                    \` • \` Komut Kanalı ${komutkanal}
                    \` • \` Chat Kanalı ${genelsohbet}
                    \` • \` Welcome Kanalı ${giriskanal}
                    \` • \` Rol Alma Kanalı ${ecrolalma}
                    \` • \` Kullanıcı Panel Kanalı ${kpanel}
                    \` • \` Public Kategori ${publicParent}
`
                    )]
                })
            }
        })
    }
        //ROL ALMA AYARLARI
        if (args[0] === "13" || args[0] === "banHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { banHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Ban Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "14" || args[0] === "jailHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Jail Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "15" || args[0] === "muteHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Mute Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "16" || args[0] === "vmuteHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmuteHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Voice Mute Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "clownhammer" || args[0] === "clownHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { clownHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Clown Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "movehammer" || args[0] === "moveHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { moveHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Move Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "12" || args[0] === "registerHammer") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { registerHammer: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Regıster Hammer Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "8" || args[0] === "unregister") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { unregisterRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Kayıtsız Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "10") { let roller; if (message.mentions.roles.size >= 1) roller = message.mentions.roles.map(role => role.id); else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id)); if (roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { womanRoles: roller } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Kız Rolünü ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarladın.`)]}) }
        if (args[0] === "9") { let roller; if (message.mentions.roles.size >= 1) roller = message.mentions.roles.map(role => role.id); else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id)); if (roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { manRoles: roller } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Erkek Rolünü ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarladın.`)]}) }
        if (args[0] === "21") { let roller; if (message.mentions.roles.size >= 1) roller = message.mentions.roles.map(role => role.id); else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id)); if (roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { yonetimRoles: roller } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Yönetim Rollerini ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarladın.`)]}) }
        if (args[0] === "17" || args[0] === "taglırol") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagRol: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Tag Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "22" || args[0] === "muted") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { mutedRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Chat Mute Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "23" || args[0] === "vmuted") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmutedRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Voice Mute Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "24" || args[0] === "jailed") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailedRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Cezalı Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "18" || args[0] === "booster") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { boosterRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Booster Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "19" || args[0] === "etkinlikkatılımcısı") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { etkinlikRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Etkinlik Katılımcısı Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "20" || args[0] === "cekilisrol") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cekilisRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Çekiliş Katılımcısı Rolünü ${rol} olarak ayarladın.`)]}) }
        if (args[0] === "11" || args[0] === "vip") { let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join('')); if (!rol) return message.reply(`Bir rol belirtmelisin.`).sil(5);; await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vipRole: rol.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Vip Rolünü ${rol} olarak ayarladın.`)]}) }

        //KANAL AYARLARI
        if (args[0] === "28") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { banLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Ban Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "29") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Jail Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "27") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Mute Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "32") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Tag Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "35") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { denetimLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Denetim Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "33") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { messageLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Mesaj Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "34") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { voiceLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Ses Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "3") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { botVoiceChannel: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Bot Ses Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "5") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { genelChat: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Chat Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "6") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { welcomeChannel: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Welcome Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "7") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { inviteLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Davet Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "31") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { rolLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Rol Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "36") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { guardLog: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Guard Log Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "25") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { ecChannel: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Rol Alma Kanalı ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "37") { let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first(); if (!channel) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { kullaniciPanelChannel: channel.id } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Kullanıcı Panel ${channel} olarak ayarladın.`)]}) }
        if (args[0] === "4") { let kanallar; if (message.mentions.channels.size >= 1) kanallar = message.mentions.channels.map(kanal => kanal.id); else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id)); if (kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { commandsChannel: kanallar } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Komut Kanal ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarladın.`)]}) }

        if (args[0] === "26" || args[0] === "publickategori") { let kanallar; if (message.mentions.channels.size >= 1) kanallar = message.mentions.channels.map(kanal => kanal.id); else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id)); if (kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { publicParents: kanallar } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde \`Public\` kategorilerini ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarladın.`)]}) }

        if (args[0] === "1") { let metin = args.splice(1).join(" "); if (!metin) return message.reply(`Bir tag belirtmeyi unuttun!`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tags: metin } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Tag \`${metin}\` olarak ayarladın.`)]}) }
        if (args[0] === "sembol") { let metin = args.splice(1).join(" "); if (!metin) return message.reply(`Bir tag belirtmeyi unuttun!`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { isimsembol: metin } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde Tag \`${metin}\` olarak ayarladın.`)]}) }
        if (args[0] === "2") { let metin = args.splice(1).join(" "); if (!metin) return message.reply(`Bir tag belirtmeyi unuttun!`).sil(5); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { isimsemboliki: metin } }, { upsert: true }).exec(); message.channel.send({embeds: [embed.setDescription(`Başarılı bir şekilde İkinci Tag \`${metin}\` olarak ayarladın.`)]}) }

    }
};



module.exports = Setup
