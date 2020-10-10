// startup section
// Defines and calls the functions the discord bpot requires

const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

const Commando = require('discord.js-commando');

const request = require('request');

const ms = require("ms");

const weather = require("weather-js")


// Console log when Bot is added to server
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// A goodbye message iwhen bot leaves a server
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers!`);
  // Usual discord bot status - Serving ${client.guilds.size} servers!
});

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Your mental capacity is so small`);
  // Usual discord bot status - Serving ${client.guilds.size} servers!
});

// if a message comes from a bot exit early
client.on("message", async message => {
  

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

// This is the code for the Bot startup
// will be ran automatically when bot started






// Help Command
// This will create and post a list of all the bots commands
// The "Main menu" if you will

if(command === "help") {
    const embed = new Discord.RichEmbed()
  .setTitle("WhatTheDucks's Help Command")
  .setAuthor("WhatTheDuck", "https://i.imgur.com/BvFaeyW.jpg")
   .setColor(0x00AE86)
  .setDescription("All DuckBot commands")
  .setFooter("WhatTheDuck help embed", "https://i.imgur.com/BvFaeyW.jpg")
  .setThumbnail("https://i.imgur.com/BvFaeyW.jpg")
  .setTimestamp()
  .setURL("https://discordapp.com/api/oauth2/authorize?client_id=665450246939082783&permissions=0&scope=bot")
  .addField("d!help",
    "Gives the user a list of the bots commands { Usage: d!help }")
  .addField("d!kick",
    "Kicks Mentioned user { Usage: `d!kick @ExampleNameHere` }")
  .addField("d!ban",
    "Bans Mentioned user {Usage: `d!ban @ExampleNameHere` }")
  .addField("d!purge",
    "Purges messages above { Usage: `d!purge 10` }")
  .addField("d!mute",
    "Mutes the mentioned person { Usage: `d!mute @Example 1m` }")
  .addField("d!unmute",
    "Un-mutes the mentioned person { Usage: `d!unmute @Example` }")
  .addField("d!vegetable",
    "Posts an image of a *Vegetable { Usage: `d!vegetable` }")
  .addField("d!howgay",
    "Tells you how gay you are { Usage: `d!howgay` }")
  .addField("d!8ball",
    "Awnsers a question { Usage: `d!8ball your question here` }")
  .addField("d!cat",
    "Gives the user a random cat gif { `Usage: d!cat` }")
  .addField("d!flip",
    "Flips text { Usage: `d!flip your words here` }")
  .addField("d!kill",
    "Kills the mentioned user { Usage: `d!kill @Example` }")
  .addField("d!lenny",
    "Gives you a lenny face { Usage: `d!lenny` }")
  .addField("d!morsecode",
    "Translates text to Morse code { Usage: `d!morsecode your words here` }")
  .addField("d!serverinfo",
    "Gives info on the server { Usage: `d!serverinfo` }")
  .addField("d!botinfo",
    "Gives the user info on the bot { Usage: `d!botinfo` }")
  .addField("d!id",
    "Fetches the mentioned users ID { Usage: `d!id @Example` }")
  .addField("d!roleinfo",
    "Gives info on the named role { Usage: `d!roleinfo ExampleRole` }")
  .addField("d!userinfo",
    "Gives info on a mentioned user { Usage: `d!userinfo @Example` }")
  .addField("d!weather",
    "Gives the weather on named location { `Usage: d!weather texas` }")
  .addField("d!ping",
    "Gives your current ping { `Usage: d!ping` }")
  .addField("d!say",
    "Repeats what the user says { `Usage: d!say this is a sentence` }")
  .addField("d!webhook",
    "Creates a webhook in the current text channel { `Usage: d!Webhook` }")
  .addField("embed",
    "Embeds what the user says { Usage: `d!embed your words here` }")
  .addField("invite",
    "want to invite this bot to your server? use `d!invite` for a link!")
  message.channel.send({embed});
  }

  // End Help menu






  // Satrt of Mod commands
  // Commands that are used to moderate a server

  if(command === "kick") {

    if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator", "Owner", "Admin", "admin", "owner", "Founders", "Manager"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "mute") {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Please tag user to mute!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you don't have permissions to use this!");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I cant mute this user");
    if (tomute.id === message.author.id) return message.channel.send("You cannot mute yourself!");
    let muterole = message.guild.roles.find(`name`, "Odar Mute");
  
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Odar Mute",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    } 
  
    let mutetime = args[1];
    if(!mutetime) return message.channel.send("You didn't specify a time!");
  
    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
  
    message.delete();
  
  }

  if(command === "unmute") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You don't have the `Manage Messages` premission")

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Please mention an user or ID to mute!");

    let role = message.guild.roles.find(r => r.name === "Odar Mute")
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

    await toMute.removeRole(role);
    message.channel.sendMessage("The user has been unmuted!");

    message.delete();

  }

  // End of the Moderation commands!







  // Start of the Fun Commands!
  // These commands are for fun puropses

  if(command === "vegetable") {
    var facts = ["https://cnet2.cbsistatic.com/img/ECPFuY2LLK_ooiGjvHpR8CqvfQM=/940x0/2018/02/28/83ce0da4-f38c-408c-9e32-5f82337570be/uberwav.jpg", "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/NAuOO95cgiknue920/videoblocks-steps-for-wheelchairs-disabled-man-in-wheelchair-can-not-overcome-obstacle-invalid-person-on-wheel-chair-stuck-difficulties-movement-people-with-disabilities-handicapped-makes-failed-attempt_huuon2wqb_thumbnail-full01.png", "https://cdn.vox-cdn.com/thumbor/suDv9_EduXcslO8QWhyL109rVMM=/41x0:1143x827/1200x800/filters:focal(41x0:1143x827)/cdn.vox-cdn.com/uploads/chorus_image/image/32713815/scope_ad.0.jpg", "https://images.wisegeek.com/depressed-man-in-wheelchair.jpg", "https://media.istockphoto.com/photos/injured-man-in-wheelchair-isolated-picture-id147321654?k=6&m=147321654&s=612x612&w=0&h=-tbVlw9uH3mVgaUKtzxUlzzLP8-ccErrEGE6UMjf8VA="];
    var fact = Math.floor(Math.random() * facts.length);
    message.channel.send(facts[fact]);
  }
  
  if(command === "howgay") {
    var roll = Math.floor(Math.random() * 100) + 1;
    message.reply("You are " + roll + "% gay");
  }

  if(command === "8ball") {
        //!8ball question
        if(!args[1]) return message.reply("Plesae enter a full question with 2 or more words!");
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];
    
        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");
    
        let ballembed = new Discord.RichEmbed()
    
        .setAuthor(message.author.username)
        .setColor("#00ff00")
        .addField("Question", question)
        .addField("Answer", replies[result]);
    
        message.channel.send(ballembed)
    
        message.delete();
    
  }

  if(command === "cat") {
    request('http://edgecats.net/random', function (error, response, body) {
      if (!error && response.statusCode == 200) {
              let emb = new Discord.RichEmbed()
              .setImage(body)
              .setColor("#00ff00")
              .setTitle("Here is your random cat")
                        
             message.channel.send(emb)  
      }
  });
}

  if(command === "flip") {
    if (args.length < 1) return message.channel.send("You must provide text to flip!");

    message.channel.send(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );
  }

  if(command === "kill") {
    let killed = message.mentions.members.first();
if(!killed) {

let emb = new Discord.RichEmbed()
.setColor("#00f00")
.setDescription(`${message.author} decied to kill themself 💔 REST IN PEACE`)

message.channel.send(emb)

} else {

let emb = new Discord.RichEmbed()
.setColor("#00f00")
.setDescription(`${killed} was killed by ${message.author} 💔 REST IN PEACE`)

message.channel.send(emb)


    }

  }

  if(command === "lenny") {

      message.channel.send("( ͡° ͜ʖ ͡°)");
      
      message.delete();
      
  }

  if(command === "morsecode") {
    let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
    morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
    text = args.join(" ").toUpperCase();
             if (!text) return message.channel.send('Place a text or a morse code to be encoded or decoded.') // but you can change the answer :)

  while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
    text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
  }
  if (text.startsWith(".") || text.startsWith("-")) {
    text = text.split(" ");
    let length = text.length;
    for (i = 0; i < length; i++) {
      text[i] = alpha[morse.indexOf(text[i])];
    }
    text = text.join("");
  } else {
    text = text.split("");
    let length = text.length;
    for (i = 0; i < length; i++) {
      text [i] = morse[alpha.indexOf(text[i])];
    }
    text = text.join(" ");
  }
  return message.channel.send("```"+text+"```");

  }


  // End of the Fun commands!







  // Start of the Information commands
  // These commands will give you information
  
  if(command === "serverinfo") {
    const embed = new Discord.RichEmbed()
  .setTitle("WhatTheDucks's ServerInfo Command")
  .setAuthor("WhatTheDuck", "https://i.imgur.com/BvFaeyW.jpg")
   .setColor(0x00AE86)
  .setDescription("Current Server Info")
  .setFooter("WhatTheDuck Serverinfo embed", "https://i.imgur.com/BvFaeyW.jpg")
  .setThumbnail("https://i.imgur.com/BvFaeyW.jpg")
  .setTimestamp()
  .setURL("https://discordapp.com/api/oauth2/authorize?client_id=665450246939082783&permissions=0&scope=bot")
  .addField("Owner",
    `${message.guild.owner}`)
  .addField("Server Name",
    `${message.guild.name}`)
  .addField("Total Members",
    `${message.guild.memberCount}`)
  .addField("Roles",
    message.guild.roles.size)
  .addField("ID",
    message.guild.id)
  .addField("Region",
    message.guild.region)
  .addField("You joined",
    message.member.joinedAt)
  .addField("Bot Joined",
    `${message.guild.joinedAt}`)
  message.channel.send({embed});
  }

  if(command === "botinfo") {
    const embed = new Discord.RichEmbed()
    .setTitle("WhatTheDucks's BotInfo Command")
    .setAuthor("WhatTheDuck", "https://i.imgur.com/BvFaeyW.jpg")
     .setColor(0x00AE86)
    .setDescription("All bot information")
    .setFooter("Developed by <@449783243407884291>", "https://i.imgur.com/BvFaeyW.jpg")
    .setThumbnail("https://i.imgur.com/BvFaeyW.jpg")
    .setTimestamp()
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=665450246939082783&permissions=0&scope=bot")
    .addField("Bot Name",
      `ID:665450246939082783 WhatTheDuck`)
    .addField("Owner Name",
      `FellowComrade <@449783243407884291>`)
    .addField("Servers",
      `Serving ${client.guilds.size} Servers`)
    .addField("Users",
      `Serving ${client.users.size} members`)
    .addField('Channels',
      `Serving ${client.channels.size} channels`)
    .addField("Bot library",
      `<:discordjs:425241283779362816> Discord.js`)
    .addField("Bot Joined",
      `${message.guild.joinedAt}`)
      message.channel.send({embed});
  }

  if(command === "id") {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    message.channel.send(`ID: \`${member.user.id}\`.`);

    message.delete();

 }

 if(command === "roleinfo") {
  let inline = true

  let role = args.join(` `)
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  const status = {
      false: "No",
      true: "Yes"
    }

  let roleemebed = new Discord.RichEmbed()
  .setColor("#00ff00")
  .addField("ID", gRole.id, inline )
  .addField("Name", gRole.name, inline)
  .addField("Mention", `\`<@${gRole.id}>\``, inline)
  .addField("Hex", gRole.hexColor, inline)
  .addField("Members", gRole.members.size, inline)
  .addField("Position", gRole.position, inline)
  .addField("Hoisted", status[gRole.hoist], inline)
  .addField("Mentionable", status[gRole.mentionable], inline)
  .addField("Managed", status[gRole.managed], inline)
  
  message.channel.send(roleemebed);

  }

  if(command === "userinfo") {
    let inline = true
    let resence = true
    const status = {
        online: "<:online:424890369688469504> Online",
        idle: "<:idle:424890472855502849> Idle",
        dnd: "<:dnd:424890429524410368> Do Not Disturb",
        offline: "<:offilne:424890400319340546> Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
    bot = "<:bottag:425631858265423883> Yes";
  } else {
    bot = "<:user:424958082691629057> No";
  }

            let embed = new Discord.RichEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `<:yes:425632265993846795> Nickname: ${member.nickname}` : "<:no:425632070036094986> None"}`, true)
                .addField("Bot", `${bot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "<:no:425632070036094986> Not playing"}`,inline, true)
                .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<:no:425632070036094986> No Roles"}`, true)
                .addField("Joined Discord At", member.user.createdAt)
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
  }

  if(command === "weather") {
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
      if(err) message.channel.send(err)

      //If the place entered is invalid
      if(result.length === 0) {
          message.channel.send("**please enter a valid location**")
          return;
      }

      //Variables
      var current = result[0].current //Variable for the current part of the JSON Output
      var location = result[0].location //This is a variable for the location part of the JSON Output

      //Sends weather log in embed
      let embed = new Discord.RichEmbed()
         .setDescription(`**${current.skytext}**`) //How the sky looks like
         .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
         .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
         .setColor(0x00AE86) //Sets the color of the embed
         .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
         .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
         .addField("Temperature", `${current.temperature}`, true)
         .addField("Feels like", `${current.feelslike} Degrees`, true)
         .addField("Winds", current.winddisplay, true)
         .addField("Humidity", ` ${current.humidity}%`, true)
         .addField("Day", `${current.day}`, true)
         .addField("Date", `${current.date}`, true)
         
         //Display when it's called
         message.channel.sendEmbed(embed)

  });

  message.delete();
  
  }

  // End of the information commands!







  // Start of the Misc Commands
  // These commands don't really go anywhere else

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command === "webhook") {
    let args = message.content.split(" ").slice(1);
      message.channel.createWebhook("Webhook", "https://i.imgur.com/p2qNFag.png")
        .then(webhook => webhook.edit("WhatTheDuck made webhook", "https://i.imgur.com/p2qNFag.png")
          .then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`))
          .then(wb => message.author.send("best webhook site ifttt.com"))
          .catch(console.error))
        .catch(console.error);
  }

  if(command === "awnser") {
    let Invite = message.guild.channels.first().createInvite()
    let Owner = message.author;
    if(Owner.id !== "449783243407884291" && Owner.id !== "697282408629796886") return message.reply("Only the bot owner can use this command!")
   
    const id = args.shift();
    const sayMessage = args.join(" ")
    if(!sayMessage) return message.reply("Usage `!answer ID  your message`")
    

   let contact = new Discord.RichEmbed()
   .setAuthor(Owner.username)
   .setColor("00ff00")
   .setThumbnail(Owner.displayAvatarURL)
   .setTitle("Response  from your contact!")
   .addField("Response:", sayMessage)
   .addField("Support Server", "[Odar Army](https://discord.gg/zvvasbc)")
   .setTimestamp()

    bot.users.get(id).send(contact);

    let chanemb = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setDescription(`Message sent to <@${id}>`);

    message.channel.send(chanemb).then(msg => {msg.delete(5000)});


        message.delete();

  }

  if(command === "embed") {

    const cmd = args.join(' ').split(' | ')
  
    let emb = new Discord.RichEmbed()
    .setTitle(cmd[0])
    .setColor(cmd[1])
    .setDescription(`${message.author.username}`)
    .setTimestamp()
  
    message.channel.send(emb)
    
    message.delete();
  
 }

 if(command === "invite") {
  let emb = new Discord.RichEmbed()
  .setTitle("Invite")
  .setColor("#00ff00")
  .setDescription('use this link to add bot to your server')
  .addField('http://bit.ly/WTDuckBot')
  .setTimestamp()

  message.channel.send(emb)
  
  message.delete();

  }

  // End of the Misc commands!
});




client.login(config.token);
// Allows the bot to logon as the bot!
// End code