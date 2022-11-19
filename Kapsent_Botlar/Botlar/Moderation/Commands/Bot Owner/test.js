const { kapsentcik, market } = require('../../../../Helpers/Schemas')
class Test extends Command {
    constructor(client) {
        super(client, {
            name: "testt",
            aliases: ["testt"],
            kapsent: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        /*const results = [];
        const datas = await market.findOne({ guildID: message.guild.id })
        for (let i = 0; i < datas.urunler.length; i += 5) {
            const options = [];
            let custom = secretOluştur(2)
            datas.urunler.slice(i, i + 5).forEach(async (x) => {
                options.push({ label: "Ürün : " + x.urunismi , description: x.urunfiyat + " Coin", value: `${x.urunismi}` });
            });
            results.push(
                new Discord.MessageSelectMenu()
                    .setCustomId(custom)
                    .setPlaceholder('Nothing selected.')
                    .addOptions(options)
            );
            console.log(results)
            
            }

        const row = new Discord.MessageActionRow().addComponents(
            results
        );
        console.log(row)
        message.channel.send({ embeds: [embed.setDescription(`Sa`)], components: [row]})
*/
        //console.log(kapsent.tags.some(tag => member.user.username.includes(tag) || member.user.discriminator == kapsent.tags.filter(discrim => !isNaN(discrim))[0]))
        kapsent.tags.some(tag => console.log(tag))
        //kapsent.tags.filter(discrim => console.log(!isNaN(discrim))[0])
        let member = message.member
        //console.log(member.user.discriminator == kapsent.tags.filter(discrim => !isNaN(discrim)))
        console.log(kapsent.tags.filter(t => t.startsWith("?")))
        if (kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == kapsent.tags.filter(t => t.startsWith("?"))) {
            console.log("buldum")
        } else {
            console.log("bulamadım")
        }
        message.channel.send(`${message.guild.members.cache.filter(x => kapsent.tags.some(tag => x.user.username.includes(tag)) || x.user.discriminator == kapsent.tags.filter(t => t.startsWith("?"))).size}`)
    }
}

module.exports = Test

function secretOluştur(length) { var result           = ''; var characters       = 'abcdefghijklmnopqrstuvwxyz'; var charactersLength = characters.length; for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); } return result; }