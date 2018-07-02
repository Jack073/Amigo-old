const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  //{p}tempmute @Benjamin 1s/m/h///

  let tomute = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
  if(!tomute) return message.reply("Couldn't find user.")
  if(tomute.hasPermission("MANAGE_CHANNELS")) return message.reply("Can't mute that user.");
  let muterole = message.guild.roles.find(`name`, "Muted");
  // Start of "Create Role"
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel,id) =>{
        await channel.overwritePermissions(muterole, {
          READ_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  // End of Create Role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!")

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`)

  // Mute Embed
  let muteEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#f4a742")
  .addField("Muted User:", `${tomute} with ID ${tomute.id}`)
  .addField("Muted By:", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Muted In:", message.channel)
  .addField("Muted For:", mutetime)
  .addField("Time", message.createdAt);

  let logsChannel = message.guild.channels.find(`name`, "logs");
  if(!logsChannel) return message.channel.send("Couldn't find channel with the name \"#logs\"")

  // Post Embed
  logsChannel.send(muteEmbed)

  setTimeout(function(){
    tomute.removeRole(muterole.id)
    message.channel.send(`<@${tomute.id}> has been unmuted.`)
  }, ms(mutetime));

// End of Module
}

module.exports.help = {
  name: "tempmute"
}
