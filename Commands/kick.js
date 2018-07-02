const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //{p}kick @Benjamin bad :(

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No permissions to execute this command.")
  if(kUser.hasPermission("KICK_MEMBERS")) return message.reply("That person can't be kicked!")

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#f4a742")
  .addField("Kicked User:", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By:", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In:", message.channel)
  .addField("Time:", message.createdAt)
  .addField("Reason:", kReason);

  let logsChannel = message.guild.channels.find(`name`, "logs");
  if(!logsChannel) return message.channel.send("Couldn't find channel with the name \"#logs\"")

  message.guild.member(kUser).kick(kReason)
  logsChannel.send(kickEmbed);

  return;
}

module.exports.help = {
  name: "kick"
}
