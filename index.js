import "dotenv/config";

import { Client, IntentsBitField } from "discord.js";
import {
  collectionSlashs,
  registrySlash,
  loadSlashCommands,
} from "./utils/loaders.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once("clientReady", async (e) => {
  await loadSlashCommands("commands");

  await registrySlash(e.user.id);

  console.log(`${e.user.displayName} está online!🔥`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    try {
      const commandName = interaction.commandName;
      await collectionSlashs.get(`${commandName}`)(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(process.env.TOKEN);
