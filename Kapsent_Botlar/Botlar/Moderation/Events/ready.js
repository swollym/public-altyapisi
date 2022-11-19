const { CronJob } = require("cron");
const { Users, kapsentcik, tasks, Penalties, messageGuild, voiceGuild, messageUser } = require('../../../Helpers/Schemas')
const moment = require("moment")
moment.locale("tr")
class Ready {
  Event = "ready"
  async run() {
    setInterval(async () => {
      const guild = client.guilds.cache.get(config.guildID)
      guild.invites.fetch().then((guildInvites) => {
        const cacheInvites = new Discord.Collection();
        guildInvites.map((inv) => {
          cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
        });
        client.invites.set(guild.id, cacheInvites);
      });
      const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
      const channel = client.channels.cache.get(kapsent.botVoiceChannel);
      voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }, 600 * 1000);
    //setInterval(() => { TagKontrol(); }, 600 * 1000);
    //setInterval(() => { TagKontrol1(); }, 600 * 1000);
    //setInterval(() => { TagKontrol2(); }, 60 * 1000);
    //setInterval(() => { TagKontrol3(); }, 60 * 1000);
    //setInterval(() => { TagKontrol4(); }, 120 * 1000);
    setInterval(() => { cezaKontrol(); }, 15 * 1000);
    setInterval(() => { gorevKontrol(); }, 15* 1000)
    try {
      const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
      const gorevs = new CronJob("00 00 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          let arr = ["davet", "mesaj", "ses", "taglı", "teyit"];
          let dagit = []
          await client.guilds.cache.get(config.guildID).roles.cache.get(kapsent.registerHammer).members.array().forEach((x, index) => {
            let random = arr[Math.floor(Math.random() * arr.length)]
            dagit.push({
              user: x.id,
              gorev: random
            })
          });

          let veri = dagit;
          client.channels.cache.get(kapsent.dailyMissionLog).send(`${client.guilds.cache.get(config.guildID).name} ${moment(Date.now()).locale("tr").format("LLL")} tarihinde dağıtılan günlük görevler;`);
          veri.forEach((user, index) => {
            setTimeout(async () => {
              if (index >= veri.length) return client.channels.cache.get(kapsent.dailyMissionLog).send(`Başarılı bir şekilde tüm görevlerin dağıtımı tamamlandı!`);
              let mesajRandom = getRandomInt(300, 400)
              let davetRandom = getRandomInt(5, 10)
              let sesRandom = getRandomInt(60, 300)
              let taglıRandom = getRandomInt(1, 3)
              let teyitRandom = getRandomInt(5, 20)
              let miktarlar = user.gorev == "mesaj" ? mesajRandom : user.gorev == "davet" ? davetRandom : user.gorev == "ses" ? sesRandom : user.gorev == "taglı" ? taglıRandom : user.gorev == "teyit" ? teyitRandom : 0
              if (user.gorev == 'ses') {
                const id = await tasks.find({ guildID: config.guildID });
                client.channels.cache.get(kapsent.dailyMissionLog).send(`<@${user.user}> bugün ses kanallarında \`${miktarlar}\` dakika ses aktifliği görevi aldın!`)
                await new tasks({ guildID: config.guildID, userID: user.user, id: id ? id.length + 1 : 1, type: "ses", count: miktarlar, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `Ses kanallarında ${miktarlar} dakika vakit geçir!` }).save();
              }
              if (user.gorev == 'mesaj') {
                const id = await tasks.find({ guildID: config.guildID });
                client.channels.cache.get(kapsent.dailyMissionLog).send(`<@${user.user}> bugün <#${kapsent.genelChat}> kanalında \`${miktarlar}\` mesaj atma görevi aldın!`)
                await new tasks({ guildID: config.guildID, userID: user.user, id: id ? id.length + 1 : 1, type: "mesaj", count: miktarlar, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: kapsent.genelChat, message: `<#${kapsent.genelChat}> kanalında ${miktarlar} mesaj at!` }).save();
              }
              if (user.gorev == 'taglı') {
                const id = await tasks.find({ guildID: config.guildID });
                client.channels.cache.get(kapsent.dailyMissionLog).send(`<@${user.user}> bugün \`${miktarlar}\` adet taglı üye çekme görevi aldın!`)
                await new tasks({ guildID: config.guildID, userID: user.user, id: id ? id.length + 1 : 1, type: "taglı", count: miktarlar, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${miktarlar} adet taglı üye çek!` }).save();
              }
              if (user.gorev == 'teyit') {
                const id = await tasks.find({ guildID: config.guildID });
                client.channels.cache.get(kapsent.dailyMissionLog).send(`<@${user.user}> bugün \`${miktarlar}\` adet kayıt yapma görevi aldın!`)
                await new tasks({ guildID: config.guildID, userID: user.user, id: id ? id.length + 1 : 1, type: "kayıt", count: miktarlar, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${miktarlar} adet kayıt yap!` }).save();
              }
              if (user.gorev == 'davet') {
                const id = await tasks.find({ guildID: config.guildID });
                client.channels.cache.get(kapsent.dailyMissionLog).send(`<@${user.user}> bugün \`${miktarlar}\` adet davet görevi aldın!`)
                await new tasks({ guildID: config.guildID, userID: user.user, id: id ? id.length + 1 : 1, type: "invite", count: miktarlar, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${miktarlar} adet invite yap!` }).save();
              }
            }, index * 2000)
          })
        });
      }, null, true, "Europe/Istanbul");
      gorevs.start();
      const guildses = client.guilds.cache.get(config.guildID)
      new CronJob("00 00 * * 00", async () => {
        await messageGuild.findOneAndUpdate({ guildID: guildses.id }, { $set: { weeklyStat: 0 } });
        await voiceGuild.findOneAndUpdate({ guildID: guildses.id }, { $set: { weeklyStat: 0 } });
        await messageUser.find({ guildID: guildses.id }, (err, data) => {
          data.forEach((veri) => {
            veri.weeklyStat = 0
            veri.save()
          });
        });
        await voiceUser.find({ guildID: guildses.id }, (err, data) => {
          data.forEach((veri) => {
            veri.weeklyStat = 0
            veri.save()
          });
        });
      }, null, true, "Europe/Istanbul").start();
    } catch (e) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + e + ``)
    }
  }
};
async function TagKontrol() {
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  if (kapsent.bannedTag === true) try {
    const guild = client.guilds.cache.get(config.guildID)
    const members = guild.members.cache.filter(member => kapsent.bannedTags.some(tag => member.user.username.includes(tag)) && !member.roles.cache.has(kapsent.bannedTagRole) && !member.user.bot).array().splice(0, 10)
    for await (const member of members) {
      await member.setRoles(kapsent.bannedTagRole)
      await member.send(`**${member.guild.name}** sunucusunda ismine yasaklı tag aldığın için yasaklı taga atıldın! Tagı bıraktığında tekrardan aramıza katılabilirsin`).catch(error => client.logger.error(error))
      await client.channels.cache.get(kapsent.bannedTagLog).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`**${member.user.tag}** (\`${member.id}\`) isimli kullanıcıya, sunucumuza yasaklı bir tag ile girdiği için <@&${kapsent.bannedTagRole}> rolünü verdim.`).setTimestamp().setFooter(`Developed By kapsent.`)] });
    }
  } catch (error) {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
  }
};

async function TagKontrol1() {
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  if (kapsent.bannedTag === true) try {
    const guild = client.guilds.cache.get(config.guildID)
    const members = guild.members.cache.filter(member => !settings.get("yasakTaglar").value().some(tag => member.user.username.includes(tag)) && member.roles.cache.has(kapsent.bannedTag) && !member.user.bot).array().splice(0, 10)
    for await (const member of members) {
      await user.setRoles(kapsent.unregisterRole)
      await user.setNickname(`${kapsent.isimsembol} Kayıtsız`)
      await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: user.id } } });
      await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
      await client.channels.cache.get(bannedTagLog).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`**${member.user.tag}** (\`${member.id}\`) isimli kullanıcı, ismindeki yasaklı tagı kaldırdığı için <@&${kapsent.bannedTagRole}> rolünü aldım.`).setTimestamp().setFooter(`Developed By kapsent.`)] });
    }
  } catch (error) {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
  }
};

async function TagKontrol2() { // TAG ALANA ROL
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  const guild = client.guilds.cache.get(config.guildID)
  const members = guild.members.cache.filter(member => kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == kapsent.tags.filter(t => t.startsWith("#")) && !kapsent.bannedTags.some(tag => member.user.username.includes(tag)) && !member.roles.cache.has(kapsent.jailedRole) && !member.roles.cache.has(kapsent.bannedTagRole) && !member.user.bot && !member.roles.cache.has(kapsent.tagRol)).array().splice(0, 10)
  for await (const member of members) {
    await member.roles.add(kapsent.tagRol);
    if (member.manageable) await member.setNickname(member.displayName.replace(kapsent.isimsemboliki ? kapsent.isimsemboliki : kapsent.isimsembol, kapsent.isimsembol))
    await client.channels.cache.get(kapsent.tagLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${member} adlı kullanıcıya adında tagımızı bulundurduğu için <@&${kapsent.tagRol}> rolü verildi!`).setTimestamp().setFooter(`Developed By kapsent.`, client.user.avatarURL())] });
  }
};

async function TagKontrol3() { // TAGI OLMAYANIN ROLÜNÜ ALMA  
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  const guild = client.guilds.cache.get(config.guildID)
  const members = guild.members.cache.filter(member => !kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator !== kapsent.tags.filter(t => t.startsWith("#")) && !member.user.bot && member.roles.cache.has(kapsent.tagRol)).array().splice(0, 10)
  for await (const member of members) {
    await member.roles.remove(kapsent.tagRol)
    await Users.findOneAndUpdate({ $pull: { Taglilar: { Member: member.id } } });
    if (member.manageable) await member.setNickname(member.displayName.replace(kapsent.isimsembol, kapsent.isimsemboliki ? kapsent.isimsembol : kapsent.isimsembol))
    await client.channels.cache.get(kapsent.tagLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${member} adlı kullanıcı adında tagımızı bulundurmadığı için <@&${kapsent.tagRol}> rolü alındı!`).setTimestamp().setFooter(`Developed By kapsent.`, client.user.avatarURL())] });
  }
};

async function TagKontrol4() { // TAGI OLMAYANI KAYITSIZA ATMA  
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  if (kapsent.tagliAlim === true) {
    const guild = client.guilds.cache.get(config.guildID)
    const members = guild.members.cache.filter(member => !kapsent.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator !== kapsent.tags.filter(t => t.startsWith("#")) && !member.permissions.has("ADMINISTRATOR") && !member.user.bot && !member.roles.cache.has(kapsent.vipRol) && !member.roles.cache.has(kapsent.boosterRole) && !member.roles.cache.has(kapsent.unregisterRole) && !member.roles.cache.has(kapsent.jailedRole) && !member.roles.cache.has(kapsent.bannedTagRole)).array().splice(0, 10)
    for await (const member of members) {
      await member.setRoles(kapsent.unregisterRole)
      await member.setNickname(`${kapsent.isimsembol} Kayıtsız`)
      await Users.findOneAndUpdate({ $pull: { Taglilar: { Member: member.id } } });
      await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: new String } }, { upsert: true }).exec();
      await client.channels.cache.get(kapsent.tagLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username + ' - Oto Tag', client.user.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcı adında tagımızı bulundurmadığı için kayıtsıza atıldı.`).setTimestamp().setFooter(`Developed By kapsent.`, client.user.avatarURL())] });
    }
  }
};

async function cezaKontrol() {
  const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
  const guild = client.guilds.cache.get(config.guildID)
  if (!guild) return;
  try {
    const bitmisCezalar = await Penalties.find({ guildID: guild.id, Aktif: true, kalkmazamani: { $lte: Date.now() } });
    await bitmisCezalar.forEach(async (data) => {
      const member = guild.members.cache.get(data.userID);
      if (!member) return;
      if (data.Ceza === "CHATMUTE") {
        data.Aktif = false;
        await data.save();
        await member.roles.remove(kapsent.mutedRole);
        await client.channels.cache.get(kapsent.muteLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Chat Mute Bitiş').setDescription(`${member} (${member.id}) üyesinin chat mute süresi bittiği için, cezası kaldırıldı!`).setTimestamp().setFooter(`Developed By kapsent.`, client.user.avatarURL())] });
      }
      if (data.Ceza === "VOICEMUTE") {
        data.Aktif = false;
        await data.save();
        await member.roles.remove(kapsent.vmutedRole);
        if (member && member.voice.channel) member.voice.setMute(false);
        await client.channels.cache.get(kapsent.muteLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Chat Mute Bitiş').setDescription(`${member} (${member.id}) üyesinin voice mute süresi bittiği için, cezası kaldırıldı!`).setTimestamp().setFooter(`Developed By kapsent.`, client.user.avatarURL())] });
      }
    });
    const aktifCezalar = await Penalties.find({ guildID: guild.id, Aktif: true });
    await aktifCezalar.forEach(async (data) => {
      const member = guild.members.cache.get(data.userID);
      if (!member) return;
      if (data.Ceza === "CHATMUTE" && !member.roles.cache.has(kapsent.mutedRole)) { member.roles.add(kapsent.mutedRole) }
      if (data.Ceza === "VOICEMUTE" && !member.roles.cache.has(kapsent.vmutedRole)) { member.roles.add(kapsent.vmutedRole) }
      if (data.Ceza === "JAIL" && !member.roles.cache.has(kapsent.jailedRole)) { member.setRoles(kapsent.jailedRole) }
    })

  } catch(error) {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
  }
}

async function gorevKontrol() {
  client.guilds.cache.forEach(async (guild) =>
    await tasks.findOneAndUpdate({ guildID: guild.id, active: true, finishDate: { $lte: Date.now() } }, { active: false }))
}

module.exports = Ready


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}