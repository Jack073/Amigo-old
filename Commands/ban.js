const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //{p}ban @Benjamin very bad :(

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("No permissions to execute this command.")
  if(bUser.hasPermission("BAN_MEMBERS")) return message.reply("That person can't be banned!")

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#f4a742")
  .addField("Banned User:", `${bUser} with ID ${bUser.id}`)
  .addField("Banned By:", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In:", message.channel)
  .addField("Time:", message.createdAt)
  .addField("Reason:", bReason);

  let logsChannel = message.guild.channels.find(`name`, "logs");
  if(!logsChannel) return message.channel.send("Couldn't find channel with the name \"#logs\"")

  message.guild.member(bUser).ban(bReason);
  logsChannel.send(banEmbed);

  return;
}

module.exports.help = {
  name: "ban"
}
