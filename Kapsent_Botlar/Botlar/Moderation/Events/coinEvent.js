const { coins, kapsentcik } = require('../../../Helpers/Schemas');
const { loadImage } = require("canvas")
const { Canvas } = require('canvas-constructor');
let tıklayan = new Map();
class Ready {
    Event = "ready"
    async run() {
        const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
        let int = Math.floor(Math.random() * 4) + 1
        let kanal = client.channels.cache.get(kapsent?.genelChat);
        setInterval(async () => {

            if (int == 1) {
                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setCustomId("ilk").setLabel("BENİM!").setStyle("SUCCESS")
                )
                let kazan = await kanal.send({ components: [row], content: `:tada: İlk tıklayan olup ödülü kazan!` })

                let collector = await kazan.createMessageComponentCollector({ time: 50000 })

                collector.on("collect", async (button) => {

                    if (button.customId == "ilk") {
                        if (kazan) kazan.delete();
                        let uyecik = button.guild.members.cache.get(button.user.id)
                        let miktar = Math.floor(Math.random() * 1000)
                        await coins.updateOne({ userID: uyecik.id }, { $inc: { "Coin": miktar } }, { upsert: true }).exec();
                        button.channel.send(`${uyecik} tebrik ederim, kasadan sana ufak ödüller verildi. \`+${miktar}\` :tada:`).sil(5)
                    }
                })
                collector.on("end", async () => {
                    kazan.delete().catch(x => { })
                });
            }

            if (int == 2) {
                let fotolar = [
                    "https://cdn.discordapp.com/attachments/1007214128206712882/1007297728675586078/kapsentxkapsent.png"
                ]
                let kod = makeid(8)
                let rand = fotolar[Math.floor(Math.random() * fotolar.length)]
                const background = await loadImage(rand);
                const image = new Canvas(640, 320)
                    .printImage(background, 0, 0, 640, 320)
                    .setTextFont('48px Arial Black')
                    .setColor("#fff")
                    .printText(`${kod}`, 50, 85, 125)

                const attachment = new Discord.MessageAttachment(image.toBuffer(), 'arka.jpg');
                let kazan = await kanal.send({ content: `> [ Merhaba şanslı kişi! Aşağıdaki resimde yazan kodu ilk yazan olursan +1000 coin kazanacaksın! ]`, files: [attachment] })
                    .then(kapsentmis => {
                        let filter = m => m.content === kod;
                        let collector = kapsentmis.channel.createMessageCollector({ filter: filter, time: 30000, max: 1, errors: ["time"] })
                        collector.on("collect", async (m) => {
                            let mesaj = m.content;
                            if (mesaj == kod) {
                                await coins.updateOne({ userID: uyecik.id }, { $inc: { "Coin": 1000 } }, { upsert: true }).exec();
                                if (kapsentmis) kapsentmis.delete();
                                if (m) m.react(emojis.Onay)
                                kanal.send({ content: `${m.author} tebrikler! Doğru yazarak 1000 coin kazandın! \`.coin\` komutuyla coin miktarını öğrenebilirsin!` }).sil(40)
                            }
                        })
                        collector.on("end", async () => {
                            if (kapsentmis) kapsentmis.delete();
                        })
                    }).catch(err => {
                        kazan.delete().catch(err => { })
                    })


            }

            if (int == 3) {
                let fotolar = [
                    "https://cdn.discordapp.com/attachments/1007214128206712882/1007297728675586078/kapsentxkapsent.png",
                ]
                let rand = fotolar[Math.floor(Math.random() * fotolar.length)]
                const background = await loadImage(rand);
                const image = new Canvas(640, 320)
                    .printImage(background, 0, 0, 640, 320)
                    .setTextFont('48px Arial Black')
                    .setColor("#fff")
                    .printText(``, 160, 170, 640)

                const attachment = new Discord.MessageAttachment(image.toBuffer(), 'arka.jpg');
                let ints = Math.floor(Math.random() * 10) + 1
                let row;
                let row2;
                if (ints == 1) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`5`).setStyle("PRIMARY")
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 2) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 3) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 4) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 5) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 6) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 7) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 8) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 9) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`10`).setStyle("PRIMARY"),
                    )
                } else if (ints == 10) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`1`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`2`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`3`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis4").setLabel(`4`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis5").setLabel(`5`).setStyle("PRIMARY"),
                    )
                    row2 = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis6").setLabel(`6`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis7").setLabel(`7`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis8").setLabel(`8`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis9").setLabel(`9`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${int}`).setLabel(`10`).setStyle("PRIMARY"),
                    )
                }

                let kazan = await kanal.send({ content: `> [ **1-10 ARASINDAKİ DOGRU SAYISI BUL** - Merhaba şanslı kişi! Aşağıdaki butonlardan tahmin ettiğim sayıyı bul! Doğru olursan +1000 coin kazanacaksın! ]`, files: [attachment], components: [row, row2] })
                let collector = await kazan.createMessageComponentCollector({ time: 30000 })
                collector.on("collect", async (button) => {
                    if (1 > 0 && tıklayan.has(button.member.id) && tıklayan.get(button.member.id) == 1) return button.reply({ content: `${emojis.iptal} Şansını kullandın! Malesef tekrar kullanamazsın!`, ephemeral: true })
                    if (button.customId == `${int}`) {
                        if (kazan) kazan.delete();
                        button.channel.send({ content: `${button.member} Tebrikler! Doğru tahmin ederek 1000 coin kazandın!` }).sil(40)
                        await coins.updateOne({ userID: uyecik.id }, { $inc: { "Coin": 1000 } }, { upsert: true }).exec();
                        tıklayan = new Map();
                    } else {
                        button.reply({ content: `Yanlış butonu seçerek şansını kaybettin! ${emojis.iptal}`, ephemeral: true })
                        if (!tıklayan.has(button.member.id)) tıklayan.set(button.member.id, 1);
                    }
                })
                collector.on("end", async () => {
                    if (kazan) kazan.delete();
                    tıklayan = new Map();
                })
            }

            if (int == 4) {
                let fotolar = [
                    "https://cdn.discordapp.com/attachments/1007214128206712882/1007297728675586078/kapsentxkapsent.png",
                ]
                let kod = makeid(5)
                let rand = fotolar[Math.floor(Math.random() * fotolar.length)]
                const background = await loadImage(rand);
                const image = new Canvas(640, 320)
                    .printImage(background, 0, 0, 640, 320)
                    .setTextFont('48px Arial Black')
                    .setColor("#fff")
                    .printText(`💰 💰 💰 💰 💰`, 160, 170, 640)

                const attachment = new Discord.MessageAttachment(image.toBuffer(), 'arka.jpg');
                let intss = Math.floor(Math.random() * 4) + 1
                let row;
                if (intss == 1) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId(`${kod}`).setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`💰`).setStyle("PRIMARY"),
                    )
                } else if (intss == 2) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${kod}`).setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`💰`).setStyle("PRIMARY"),
                    )
                } else if (intss == 3) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${kod}`).setLabel(`💰`).setStyle("PRIMARY"),
                    )
                } else if (intss == 4) {
                    row = new Discord.MessageActionRow().addComponents(
                        new Discord.MessageButton().setCustomId("yanlis1").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId(`${kod}`).setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis2").setLabel(`💰`).setStyle("PRIMARY"),
                        new Discord.MessageButton().setCustomId("yanlis3").setLabel(`💰`).setStyle("PRIMARY"),
                    )
                }

                let kazan = await kanal.send({ content: `> [ Merhaba şanslı kişi! Aşağıdaki butonlardan doğru olanı ilk bulan olursan +1000 coin kazanacaksın! ]`, files: [attachment], components: [row] })
                let collector = await kazan.createMessageComponentCollector({ time: 30000 })
                collector.on("collect", async (button) => {
                    if (1 > 0 && tıklayan.has(button.member.id) && tıklayan.get(button.member.id) == 1) return button.reply({ content: `${emojis.iptal} Şansını kullandın! Malesef tekrar kullanamazsın!`, ephemeral: true })
                    if (button.customId == `${kod}`) {
                        if (kazan) kazan.delete();
                        button.channel.send({ content: `${button.member} Tebrikler! Doğru butona basarak 1000 coin kazandın!` }).sil(40)
                        await coins.updateOne({ userID: uyecik.id }, { $inc: { "Coin": 1000 } }, { upsert: true }).exec();
                        tıklayan = new Map();
                    } else {
                        button.reply({ content: `Yanlış butonu seçerek şansını kaybettin! ${emojis.iptal}`, ephemeral: true })
                        if (!tıklayan.has(button.member.id)) tıklayan.set(button.member.id, 1);
                    }
                })
                collector.on("end", async () => {
                    if (kazan) kazan.delete();
                    tıklayan = new Map();
                })
            }

        }, 100000 * 5);
    }
}


module.exports = Ready


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}