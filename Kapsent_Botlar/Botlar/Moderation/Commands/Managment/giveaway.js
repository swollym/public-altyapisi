const { kapsentcik } = require('../../../../Helpers/Schemas')
const moment = require("moment");
const ms = require("ms")
class Giveaway extends Command {
    constructor(client) {
        super(client, {
            name: "çekiliş",
            aliases: ["giveaway", "gstart", "ç"],
            cooldown: 10
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!config.Founders.includes(message.author.id) && !config.root.includes(message.author.id) && !kapsent.yonetimRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)] }).sil(15)
        if (!args[0]) return message.channel.send({
            embeds: [embed.setDescription(`
Merhaba ${message.author}! **${message.guild.name}** sunucusu Çekiliş paneline Hoşgeldin aşağıda sana yardımcı olucak komutlar gösterilmiştir!

${emojis.nokta} Tüm sunucu için : \`.gstart tüm <Süre> <Ödül>\`
${emojis.nokta} Taglılara özel çekiliş için : \`.gstart tag <Süre> <Ödül>\`
${emojis.nokta} Sesteki üyelere özel çekiliş için : \`.gstart ses <Süre> <Ödül>\`
        `)]
        }).sil(60)
        if (args[0] == 'tüm') {
            if (!args[1]) return message.channel.send({ content: `**HATA :** Lütfen bir süre belirt! \`.gstart tüm <Süre> <Ödül>\`` })
            if (!args[1].endsWith("d") && !args[1].endsWith("h") && !args[1].endsWith("m")) return message.channel.send({ content: `**HATA : **Lütfen süreyi doğru bir şekilde belirt! \`m/h/d\`` }).sil(20)
            if (isNaN(args[1][1])) return message.channel.send({ content: `Girdiğin değer bir sayı olmalı!` }).sil(20)
            let odul = args.slice(2).join(" ");
            if (!odul) return message.channel.send({ content: `**HATA :** Lütfen bir ödül belirt!` }).sil(20)
            const sayı = args[1].replace("m", "").replace("h", "").replace("d", "")
            const süre = args[1].replace(sayı, "")
            const zaman = moment(new Date()).add(sayı, süre).valueOf()
            const date = zaman - new Date().getTime()
            const dakika = Math.floor(date / 60000);
            const saniye = Math.floor(date / 1000);
            const saat = Math.floor(date / 3600000);

            let arr = []
              await message.channel.send({
                content: `:tada: Çekiliş Başladı!`, embeds: [embed.setTitle(`${odul}`).setDescription(`\n
:tada: Emojisine basarak çekilişe katılabilirsin!
Çekiliş Süresi : ${saat == 0 ? `${dakika} dakika!` : `${saat} saat ${dakika} dakika!`}
\n **NOT: **Tagımızı alan kişilerin ismi 2 kere yazılıyor! \`${kapsent.tag}\`
            `)]
            }).then(m => m.react("🎉")
            &&
            setTimeout(async () => {
                m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot && message.author.id !== u.id).map(x => {
                    if (x.username.includes(kapsent.tag)) {
                      arr.push(x.id)
                    }
                    arr.push(x.id)
                  })
                  shuffle(arr)
                  shuffle(arr)
                  let random = arr[Math.floor(Math.random() * arr.length)]
                if (m.reactions.cache.get("🎉").count <= 2) {
                    message.channel.send(`Katılımcı Sayısı: \`${m.reactions.cache.get("🎉").count} kişi\``);
                    return message.channel.send({
                      content: `Çekilişin sonuçlanabilmesi için yeterli sayıda katılımcı bulunamadı!`
                });
                  } else
                if (m) await m.edit({
                    content: `:tada: Çekiliş Sonuçlandı! <@${random}>`, embeds: [embed.setDescription(`\n
Kazanan kişi : <@${random}> 
`)]
                })
            }, ms(args[1])))

        }
        if (args[0] == 'tag') {
          if (!args[1]) return message.channel.send({ content: `**HATA :** Lütfen bir süre belirt! \`.gstart tag <Süre> <Ödül>\`` })
          if (!args[1].endsWith("d") && !args[1].endsWith("h") && !args[1].endsWith("m")) return message.channel.send({ content: `**HATA : **Lütfen süreyi doğru bir şekilde belirt! \`m/h/d\`` }).sil(20)
          if (isNaN(args[1][1])) return message.channel.send({ content: `Girdiğin değer bir sayı olmalı!` }).sil(20)
          let odul = args.slice(2).join(" ");
          if (!odul) return message.channel.send({ content: `**HATA :** Lütfen bir ödül belirt!` }).sil(20)
          const sayı = args[1].replace("m", "").replace("h", "").replace("d", "")
          const süre = args[1].replace(sayı, "")
          const zaman = moment(new Date()).add(sayı, süre).valueOf()
          const date = zaman - new Date().getTime()
          const dakika = Math.floor(date / 60000);
          const saniye = Math.floor(date / 1000);
          const saat = Math.floor(date / 3600000);

          let arr = []
          await message.channel.send({
            content: `:tada: Taglılar Arası Çekiliş Başladı!`, embeds: [embed.setTitle(`${odul}`).setDescription(`\n
:tada: Emojisine basarak çekilişe katılabilirsin!
Çekiliş Süresi : ${saat == 0 ? `${dakika} dakika!` : `${saat} saat ${dakika} dakika!`}
\n **NOT: **Sadece tagı olanlar kazanabilir! \`${kapsent.tag}\`
        `)]
        }).then(m => m.react("🎉")
        &&
        setTimeout(async () => {
            m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot && message.author.id !== u.id && u.username.includes(kapsent.tag)).map(x => {
                arr.push(x.id)
              })
              shuffle(arr)
              let random = arr[Math.floor(Math.random() * arr.length)]
            if (m.reactions.cache.get("🎉").count <= 2) {
                message.channel.send(`Katılımcı Sayısı: \`${m.reactions.cache.get("🎉").count} kişi\``);
                return message.channel.send({
                  content: `Çekilişin sonuçlanabilmesi için yeterli sayıda katılımcı bulunamadı!`
            });
              } else
            if (m) await m.edit({
                content: `:tada: Taglılar Arası Çekiliş Sonuçlandı! <@${random}>`, embeds: [embed.setDescription(`\n
Kazanan kişi : <@${random}> 
`)]
            })
        }, ms(args[1])))
        }
        if (args[0] == 'ses') {
          if (!args[1]) return message.channel.send({ content: `**HATA :** Lütfen bir süre belirt! \`.gstart ses <Süre> <Ödül>\`` })
          if (!args[1].endsWith("d") && !args[1].endsWith("h") && !args[1].endsWith("m")) return message.channel.send({ content: `**HATA : **Lütfen süreyi doğru bir şekilde belirt! \`m/h/d\`` }).sil(20)
          if (isNaN(args[1][1])) return message.channel.send({ content: `Girdiğin değer bir sayı olmalı!` }).sil(20)
          let odul = args.slice(2).join(" ");
          if (!odul) return message.channel.send({ content: `**HATA :** Lütfen bir ödül belirt!` }).sil(20)
          const sayı = args[1].replace("m", "").replace("h", "").replace("d", "")
          const süre = args[1].replace(sayı, "")
          const zaman = moment(new Date()).add(sayı, süre).valueOf()
          const date = zaman - new Date().getTime()
          const dakika = Math.floor(date / 60000);
          const saniye = Math.floor(date / 1000);
          const saat = Math.floor(date / 3600000);

          let arr = []
          await message.channel.send({
            content: `:tada: Taglılar Arası Çekiliş Başladı!`, embeds: [embed.setTitle(`${odul}`).setDescription(`\n
:tada: Emojisine basarak çekilişe katılabilirsin!
Çekiliş Süresi : ${saat == 0 ? `${dakika} dakika!` : `${saat} saat ${dakika} dakika!`}
\n **NOT: **Sadece seste bulunanlar kazanabilir! \`${kapsent.tag}\`
        `)]
        }).then(m => m.react("🎉")
        &&
        setTimeout(async () => {
          const guild = client.guilds.cache.get(config.guildID)
            m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot && message.author.id !== u.id && guild.members.cache.get(u.id).voice.channelId).map(x => {
                arr.push(x.id)
              })
              shuffle(arr)
              let random = arr[Math.floor(Math.random() * arr.length)]
            if (m.reactions.cache.get("🎉").count <= 2) {
                message.channel.send(`Katılımcı Sayısı: \`${m.reactions.cache.get("🎉").count} kişi\``);
                return message.channel.send({
                  content: `Çekilişin sonuçlanabilmesi için yeterli sayıda katılımcı bulunamadı!`
            });
              } else
            if (m) await m.edit({
                content: `:tada: Sesteki Üyeler Arası Çekiliş Sonuçlandı! <@${random}>`, embeds: [embed.setDescription(`\n
Kazanan kişi : <@${random}> 
`)]
            })
        }, 10000))
        }
    }
}

module.exports = Giveaway


function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }