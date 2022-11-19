const { kapsentcik } = require('../../../../Helpers/Schemas')
class Control extends Command {
    constructor(client) {
        super(client, {
            name: "komutlar",
            aliases: ["help","commands","yardım"],
            cooldown: 30
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })

    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    let kurulum = await message.channel.send({ embeds: [embed.setDescription(`${emojis.star} **${message.author}** Bot Komutlarını İncelemek İçin Aşağıdaki Menüyü Kullan`)] })
      const row = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageSelectMenu()
              .setCustomId('kapsenthelp')
              .setPlaceholder('Komutları Görmek İçin Tıkla!')
              .addOptions([
                  {
                      label: 'Davet Komutları',
                      description: 'Davet Komutlar kategorisinin yardım bilgileri için tıkla!',
                      value: 'invite',
                  },
                  {
                      label: 'Genel Komutları',
                      description: 'Genel Komutlar kategorisinin yardım bilgileri için tıkla!',
                      value: 'genel',
                  },
                  {
                    label: 'Kayıt Komutları',
                    description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',
                    value: 'kayıt',
                },
              ]),
      );
let msg = await message.channel.send({ components: [row] })
var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, max: 2, time: 30000 })
      

client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;

if (interaction.values[0] === "invite") {
    interaction.reply({ content : `
\`\`\`
- .invite (stat [user])
- .topdavet (topdavet)
- .ts (topstat)
- .me (topdavet)
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "genel") {
    interaction.reply({ content : `
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
- .görev (görev [user])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kayıt") {
    interaction.reply({ content : `
\`\`\`
- .taglı-alım [aç/kapat]
- .e (erkek [user] İsim Yaş)
- .k (kadın [user] İsim Yaş)
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .kayıtsız (unregister [user])
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kurucu") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "moderasyon") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

})
}
}

    
        
    


module.exports = Control