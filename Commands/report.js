const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      //{p}report @Benjamin for reason
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let reason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#f4a742")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);

      let reportschannel = message.guild.channels.find(`name`, "reports")
      if(!reportschannel) return message.channel.send("Couldn't find channel with the name \"#reports\"")

      message.delete().catch(O_o=>{})
      reportschannel.send(reportEmbed)

      return;
    }

module.exports.help = {
  name: "report"
}
