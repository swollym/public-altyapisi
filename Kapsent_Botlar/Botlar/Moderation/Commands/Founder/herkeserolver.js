const {  kapsentcik } = require("../../../../Helpers/Schemas")
const {rolVer} = require("../../../../Helpers/BackupFunction")
class Herkese extends Command {
    constructor(client) {
        super(client, {
            name: "herkeserolver",
            aliases: ["herkeserol","herkeserolver"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.reply(`**UYARI :** Bir rol belirtmeyi unuttun! Rol belirtip tekrar dene!`).sil(10)
        else if (role) {
          await message.reply({ embeds: [embed.setDescription(`${emojis.onay} İşlem başarılı rol dağıtım işlemi şuanda gerçekleşiyor!\n\n${emojis.nokta} __Dağıtılan Rol :__ ( ${role} )\n${emojis.nokta} __Kullanıcı Sayısı :__ \`${message.guild.members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).size}\``)] })
          if(kapsent.denetimLog) await client.channels.cache.get(kapsent.denetimLog).send({ embeds: [embed.setDescription(`${role} isimli rol sunucuda bulunan tüm üyeler ${message.author} tarafından dağıtılmaya başlandı!`)]})
          rolVer(message.guild, role)
        }
    }
};

module.exports = Herkese