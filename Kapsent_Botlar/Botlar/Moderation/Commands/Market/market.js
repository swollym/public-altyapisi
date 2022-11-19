const { kapsentcik, market, coins } = require('../../../../Helpers/Schemas')
class Market extends Command {
    constructor(client) {
        super(client, {
            name: "market",
            aliases: ["market"],
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!args[0]) {
            if (!kapsent?.urunler.length < 0) return message.channel.send({ content: `Şuan için market sisteminde herhangi bir ürün bulunmamakta! Eklendiğinde tekrar gelmeni umarım! ` }).sil(20)
            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu().setCustomId('select').setPlaceholder('Market').addOptions(kapsent?.urunler.map(x => [{ label: "Ürün : " + x.urunismi, description: x.urunfiyat + " Coin", value: `${x.urunismi}` }])).addOptions([{ label: "Kapat!", description: "Marketi Kapat!", value: "kapat" }])
            )
            let Hesap = await coins.findOne(message.member.id)
            let Coin = Hesap ? Hesap.Coin : 0

            let urunList = await message.channel.send({
                components: [row], embeds: [embed.setDescription(`
Hey! Merhaba ${message.author}! **${message.guild.name}** coin mağazasına hoş geldin! 
      
Hesabında güncel olarak \`${Coin}\` ${emojis.para} bulunmakta!
      
${emojis.star} Aşağıdan yalnızca \`Coin\`'inin yettiği ürünleri alabilirsin!
      `)]
            })

            urunList.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU', }).then(async (interaction) => {
                if (kapsent?.urunler.find((e) => e.urunismi == interaction.values[0])) {
                    let alıncakürün = kapsent?.urunler.find((e) => e.urunismi == interaction.values[0])
                    if (alıncakürün.urunfiyat > Coin) {
                        interaction.deferUpdate();
                        if (urunList) urunList.delete();
                        interaction.channel.send(`${emojis.iptal} Malesef ${message.author}! Bu ürünü almak için yeterli coinin bulunmamakta!`)
                    } else {
                        interaction.deferUpdate();
                        if (urunList) urunList.delete();
                        await coins.updateOne({ _id: message.member.id }, { $inc: { Coin: -alıncakürün.urunfiyat } }, { upsert: true })
                        await coins.updateOne({ _id: message.member.id }, { $push: { "Envanter": { UrunIsmi: alıncakürün.urunismi, UrunFiyat: alıncakürün.urunfiyat, Tarih: Date.now() } } }, { upsert: true })
                        interaction.channel.send(`${emojis.onay} Tebrikler ${message.author}! \`${interaction.values[0]}\` adlı ürünü satın aldın!`)
                        client.channels.cache.get(kapsent.denetimLog).send(`${message.author} kişisi \`${interaction.values[0]}\` öğesini satın aldı! İletişime geçilmesini bekliyor!`)
                    }
                }

                if (interaction.values[0] == "kapat") {
                    if (urunList) urunList.delete();
                }
            })
        }
        if (args[0] == "ekle") {
            if (!config.Founders.includes(message.member.id) && !config.root.includes(message.member.id)) return;
            if (kapsent?.urunler.length >= 24) return message.reply(`${emojis.iptal} Malesef daha fazla ürün ekleyemezsiniz!`).sil(50)
            let urunisim = args.slice(2).join(" ");
            if (!urunisim) return message.reply(`${emojis.iptal} Ürün için bir isim belirle! \`.market ekle <Fiyat> <İsim>\``).sil(30)
            if (!args[1]) return message.reply(`${emojis.iptal} Ürün için bir fiyat belirle! \`.market ekle <Fiyat> <İsim>\``).sil(30)
            if (isNaN(args[1])) return message.reply(`${emojis.iptal} Ürün için bir fiyat belirle! \`.market ekle <Fiyat> <İsim>\``)
            if (!kapsent.urunler) {
                await new kapsentcik({ guildID: message.guild.id, urunler: { urunismi: urunisim, urunfiyat: args[1] } }).save()
                message.react(emojis.onay)
                message.reply(`${emojis.onay} Başarılı bir şekilde \`${urunisim}\` adında \`${args[1]}\` fiyatında ürün eklendi!`).sil(50)
            } else {
                await kapsentcik.findOneAndUpdate({ guildID: message.guild.id }, { $push: { urunler: { urunismi: urunisim, urunfiyat: args[1] } } }, { upsert: true })
                message.react(emojis.onay)
                message.reply(`${emojis.onay} Başarılı bir şekilde \`${urunisim}\` adında \`${args[1]}\` fiyatında ürün eklendi!`).sil(50)
            }
        }
        if (args[0] == "sil") {
            if (!config.Founders.includes(message.member.id) && !config.root.includes(message.member.id)) return;
            let urunisim = args.slice(1).join(" ");
            if (!urunisim) return message.reply(`${emojis.iptal} Ürün silmek için bir isim belirt! \`.market sil <İsim>\``).sil(30)
            if (!kapsent?.urunler.map(x => x.urunismi == urunisim)) return message.reply(`${emojis.iptal} Böyle bir ürün bulamadım!`).sil(30)
            if (!kapsent?.urunler) return message.reply(`${emojis.iptal} Belirli bir data bulunamadığı için bir ürün silemiyorum!`).sil(30)
            await kapsentcik.findOneAndUpdate({ $pull: { urunler: { urunismi: urunisim } } });
            message.react(emojis.onay)
            message.reply(`${emojis.onay} Tebrikler! Başarılı bir şekilde \`${urunisim}\` ürününü sildim!`)
        }
    }
}

module.exports = Market