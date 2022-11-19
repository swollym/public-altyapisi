class URL extends Command {
    constructor(client) {
        super(client, {
            name: "url",
            aliases: ["kullanım", "URL"],
            Founder: true
        });
    }
    async run(client, message, args, embed) {
        message.guild.fetchVanityData().then(res => {
            message.reply({ embeds: [embed.setAuthor(`${message.guild.name}`).setDescription(`__Sunucu özel davet urlsi :__ ( **${res.code}** ) __URL Kullanımı :__ \`${res.uses}\``)] })
        })
    }
}

module.exports = URL