const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor("#f4a742")
  .setTitle("Dog! :dog:")
  .setImage(body.url);

  message.channel.send(dogembed)
}

module.exports.help = {
  name: "dog"
}
