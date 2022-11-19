const { kapsentcik, coins } = require('../../../../Helpers/Schemas')
class CoinEkle extends Command {
    constructor(client) {
        super(client, {
            name: "coinekle",
            aliases: ["addcoin","coin-ekle"],
            cooldown: 20,
            Founder: true
        });
    }
    async run(client, message, args, embed) {
        let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!uye) return message.channel.send(`\`.coinekle <@kapsent/ID> <Miktar>\``);
        let Miktar = parseInt(args[1]);
        if(isNaN(Miktar)) return message.channel.send({ content: `Bir miktar belirtmelisin! __Örn:__ \`.coinekle <@kapsent/ID> <Miktar>\`` });
        await coins.updateOne({ userID: uye.id }, { $inc: { "Coin": Miktar } }, {upsert: true}).exec();
        await message.react(emojis.onay)
    }
}

module.exports = CoinEkle