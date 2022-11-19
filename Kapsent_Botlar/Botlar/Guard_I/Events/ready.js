const Backup = require("../../../Helpers/Backup")
const { kapsentcik } = require("../../../Helpers/Schemas")
class Ready {
  Event = "ready"
  async run() {
    setInterval(async () => {
      const kapsent = await kapsentcik.findOne({ guildID: config.guildID })
      const channel = client.channels.cache.get(kapsent.botVoiceChannel);
      voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }, 600 * 1000);
    Backup.RoleBackup();
    setInterval(() => {
      Backup.RoleBackup();
    }, 1000 * 60 * 60 * 1);
  }
}

module.exports = Ready

