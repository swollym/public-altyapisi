const { kapsentcik } = require('../../../Helpers/Schemas')
class ButtonSystem {
  Event = "interactionCreate"
  async run(interaction, args) {
    try {
        const kapsent = await kapsentcik.findOne({ guildID: config.guildID })

        if (interaction.customId === "etkinlikrol") { if (interaction.member.roles.cache.has(kapsent.etkinlikRole)) { interaction.member.roles.remove(kapsent.etkinlikRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinizden <@&${kapsent.etkinlikRole}> rolü alındı!`, ephemeral: true }) } else { interaction.member.roles.add(kapsent.etkinlikRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinize <@&${kapsent.etkinlikRole}> rolü verildi!`, ephemeral: true }) } }
    
        if (interaction.customId === "cekilisrol") { if (interaction.member.roles.cache.has(kapsent.cekilisRole)) { interaction.member.roles.remove(kapsent.cekilisRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinizden <@&${kapsent.cekilisRole}> rolü alındı!`, ephemeral: true }) } else { interaction.member.roles.add(kapsent.cekilisRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinize <@&${kapsent.cekilisRole}> rolü verildi!`, ephemeral: true }) } }
    
    
    } catch (e) {
        client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + e)
    }
}
}

module.exports = ButtonSystem