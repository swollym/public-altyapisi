const { Users } = require('../../../../Helpers/Schemas')
class AFK extends Command {
    constructor(client) {
        super(client, {
            name: "afk",
            aliases: ["afk"],
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        const reason = args.join(" ") || "Afk Moduna Geçiş Yaptı";
        const erk = await Users.findOne({ userID: message.author.id }) || []
        if (erk.AfkStatus) return message.reply("Zaten klavyeden uzakta modundasın!").sil(5)
        if (inviteEngel.test(reason)) {
            if (message) message.delete()
            return message.channel.send({ embeds: [embed.setDescription(`Afk sebebi link veya discord linki içeremez ${emojis.hata}`)] })
        } else {
            if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`)
            await Users.findOneAndUpdate({ userID: message.author.id }, { $set: { AfkStatus: { reason, date: Date.now() } } }, { upsert: true });
            message.reply({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle("Offline").setDescription(`${message.author} adlı kullanıcı **${reason}** sebebi ile __AFK__ modunda!`)] }).sil(20)
        }
    }
}

module.exports = AFK