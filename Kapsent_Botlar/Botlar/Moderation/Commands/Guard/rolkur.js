const { kapsentcik, roleBackup } = require("../../../../Helpers/Schemas")
const {rolKur} = require("../../../../Helpers/BackupFunction")
class rolkur extends Command {
    constructor(client) {
        super(client, {
            name: "rolkur",
            aliases: ["rokurulum","rolkur"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const kapsent = await kapsentcik.findOne({ guildID: message.guild.id })
        if (!args[0] || isNaN(args[0])) return message.reply(`**UYARI :** Bir rol belirtmeyi unuttun!`).sil(5); 
        await roleBackup.findOne({ roleID: args[0] }, async (err, data) => { 
            if (!data) return message.reply(`**UYARI:** Belirtilen rol ID'sine ait veri bulunamadı!`).sil(5); 
            const newRole = await message.guild.roles.create({ 
                name: data.name, 
                color: data.color, 
                hoist: data.hoist, 
                permissions: data.permissions, 
                position: data.position, 
                mentionable: data.mentionable, 
                reason: "Rol Silindiği İçin Tekrar Oluşturuldu!" 
            }); 
            await message.reply({ embeds: [embed.setDescription(`<@&${newRole.id}> (\`${newRole.id}\`) isimli rol oluşturuldu ${emojis.onay}\n\n Rol üyelerine dağıtılmaya ve kanal izinleri eklenmeye başlanıyor.`)] }); rolKur(args[0], newRole); 
            await client.channels.cache.get(kapsent.guardLog).send({ embeds: [embed.setDescription(`${message.author} tarafından <@&${newRole.id}> [\`${newRole.id}\`] rolü oluşturdu!`)] }) 
            if (args[0] === kapsent.banHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { banHammer: newRole.id } }, { upsert: true }).exec(); }

            if (args[0] === kapsent.jailHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.muteHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.vmuteHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmuteHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.clownhammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { clownHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.moveHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { moveHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.registerHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { registerHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.unregisterRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { unregisterRole: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.tagRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagRol: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.mutedRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { mutedRol: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.vmutedRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmutedRol: newRole.id } }, { upsert: true }).exec();}
    
            if (args[0] === kapsent.jailedRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailedRole: newRole.id } }, { upsert: true }).exec();}
    
            if (args[0] === kapsent.etkinlikRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { etkinlikRole: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === kapsent.cekilisRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cekilisRole: newRole.id } }, { upsert: true }).exec(); }
        
            if (kapsent.manRoles.includes(args[0])) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { manRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { manRoles: newRole.id } }, { upsert: true }).exec(); }
    
            if (kapsent.womanRoles.includes(args[0])) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { womanRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { womanRoles: newRole.id } }, { upsert: true }).exec(); }
    
            if (kapsent.yonetimRoles.includes(args[0])) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { yonetimRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { yonetimRoles: newRole.id } }, { upsert: true }).exec(); }    
        });
        }
};

module.exports = rolkur