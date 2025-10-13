import 'dotenv/config';

import { Client, IntentsBitField } from "discord.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})

const prefix = "!"

client.once("ready", async (e) => {
  console.log(`${e.user.displayName} está online!🔥`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return

  const commandName = message.content.toLowerCase().split(" ")[0].substring(prefix.length);

  if (commandName === "hello") {
    message.reply({content: "Hello World!!!"})
  }
})

client.login(process.env.TOKEN);
