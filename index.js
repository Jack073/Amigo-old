const botconfig = require("./Data/botconfig.json");
const tokenfile = require("./Data/token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection;

fs.readdir("./Commands/", (err, files) => {
    if(err) console.log(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log("No commands to load.")
        return
    }
    console.log(`Loading ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let props = require(`./Commands/${f}`)
        console.log(`${i + 1}: ${f} loaded.`)
        bot.commands.set(props.help.name, props)
    })
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity("in development!")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(tokenfile.token);
