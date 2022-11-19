const { kapsentcik } = require('../../../../Helpers/Schemas')
class Control extends Command {
    constructor(client) {
        super(client, {
            name: "rhelp",
            aliases: ["rhelp"],
            cooldown: 30
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!config.Founders.includes(message.author.id) && !config.root.includes(message.author.id) && !kapsent.yonetimRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)] }).sil(15)
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('kurucu').setLabel("Bot Owner!").setStyle('SECONDARY'));
        let ysay = await message.channel.send({ embeds: [embed.setDescription(`${emojis.star} **${message.guild.name}**, __Bot Owner için olan komutlar için butona basmanız yeterli!__`)], components: [row] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = ysay.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button, user) => {
            if (button.customId === "kurucu") {
                await button.reply({ content: `\`.otokontrol\`\n\`.eval\`\n\`.reboot\`\n\`.sunucukontrol\`\n\`.guilds\`\n\`.setup\`\n\`.ayar\`\n\`.kur\`\n`, ephemeral: true })
            }
        })
    }
}

module.exports = Control