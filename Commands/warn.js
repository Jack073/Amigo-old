const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./Data/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  // {p}warn @snail bad girl
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No permissions to execute this command.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(`Couldn't find a user with the ID ${wUser.id}`)
  if(wUser.hasPermission("KICK_MEMBERS")) return message.reply("That person can't be warned.")
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./Data/warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#f4a742")
  .addField("Warned User:", `<@${wUser.id}>`)
  .addField("Warned In:", message.channel)
  .addField("Number of Warnings:", warns[wUser.id].warns)
  .addField("Reason:", reason);

  let logsChannel = message.guild.channels.find(`name`, "logs");
  if(!logsChannel) return message.channel.send("Couldn't find channel with the name \"#logs\"")

  logsChannel.send(warnEmbed)

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("Create a role with the name \"Muted\"")

    let mutetime = "10m";
    await(wUser.addRole(muterole.id))
    message.channel.send(`<@${wUser.id}> has been muted for 10 minutes.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.channel.reply(`They have been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).kick(reason);
    message.channel.send(`<@${wUser.id}> has been kicked.`)
  }

}

module.exports.help = {
  name: "warn"
}
