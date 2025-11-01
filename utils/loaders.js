import "dotenv/config";

import { Collection, REST, Routes } from "discord.js";
import { lstatSync, readdirSync } from "fs";

const apiConnection = new REST().setToken(process.env.TOKEN);
const arraySlashs = [];
export const collectionSlashs = new Collection();

export async function loadSlashCommands(path) {
  for (const file of readdirSync(path)) {
    if (lstatSync(`${path}/${file}`).isDirectory()) {
      await loadSlashCommands(`${path}/${file}`);
    } else {
      if (file.endsWith(".js")) {
        const cmd = await import(`../${path}/${file}`);

        if (cmd.data && cmd.execute) {
          arraySlashs.push(cmd.data);
          collectionSlashs.set(cmd.data.name, cmd.execute);
        }
      }
    }
  }
}

export async function registrySlash(id) {
  try {
    const commands = await apiConnection.put(Routes.applicationCommands(id), {
      body: arraySlashs,
    });
    console.log(`Eu registrei ${commands.length} Slash Commands`);
  } catch (err) {
    console.error(err);
  }
}
