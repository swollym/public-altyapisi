const { kapsentcik, roleBackup } = require("../../../Helpers/Schemas")
const { guvenli } = require("../../../Helpers/function")
const { rolKur } = require("../../../Helpers/BackupFunction")
class roleDelete {
  Event = "roleDelete"
  async run(role) {
    const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
    if (kapsent.channelGuard === true) try {
        let entry = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        const channel = client.channels.cache.get(kapsent.guardLog)
        const roleData = await roleBackup.findOne({ roleID: role.id })
        const newRole = await role.guild.roles.create({ name: roleData ? roleData.name : role.name, color: roleData ? roleData.color : role.color, hoist: roleData ? roleData.hoist : role.hoist, position: roleData ? roleData.position : role.rawPosition, permissions: roleData ? roleData.permissions : role.permissions, mentionable: roleData ? roleData.mentionable : role.mentionable, reason: "Rol Silindiği İçin Tekrar Oluşturuldu!" });
        await roleBackup.findOne({ roleID: role.id }, async (err, data) => { if (!data) { if (channel) channel.send({ content: `[${role.id}] ID'li rol silindi fakar datamda herhangi bir veri bulamadım! İşlemleri malesef gerçekleştiremiyorum!` }); console.log(`[${role.id}] ID'li rol silindi fakat herhangi bir veri olmadığı için işlem yapılmadı.`); return } rolKur(role.id, newRole) });
        if (role === kapsent.banHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { banHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.jailHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.muteHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.vmuteHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmuteHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.clownhammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { clownHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.moveHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { moveHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.registerHammer) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { registerHammer: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.unregisterRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { unregisterRole: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.tagRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagRol: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.mutedRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { mutedRol: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.vmutedRol) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmutedRol: newRole.id } }, { upsert: true }).exec();}

        if (role === kapsent.jailedRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailedRole: newRole.id } }, { upsert: true }).exec();}

        if (role === kapsent.etkinlikRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { etkinlikRole: newRole.id } }, { upsert: true }).exec(); }

        if (role === kapsent.cekilisRole) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $set: { cekilisRole: newRole.id } }, { upsert: true }).exec(); }
    
        if (kapsent.manRoles.includes(role)) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { manRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { manRoles: newRole.id } }, { upsert: true }).exec(); }

        if (kapsent.womanRoles.includes(role)) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { womanRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { womanRoles: newRole.id } }, { upsert: true }).exec(); }

        if (kapsent.yonetimRoles.includes(role)) { await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $pull: { yonetimRoles: role } }, { upsert: true }).exec(); await kapsentcik.findOneAndUpdate({ guildID: config.guildID }, { $push: { yonetimRoles: newRole.id } }, { upsert: true }).exec(); }
    
      } catch (error) { console.log(`Etkinlik : Role Delete - Hata : ` + error) }
  }
}

module.exports = roleDelete