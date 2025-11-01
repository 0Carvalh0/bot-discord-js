import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("hello_world")
  .setDescription("Comando de Teste do Bot")
  .toJSON();

export async function execute(interaction) {
  interaction.reply({ content: `Hello ${interaction.user}` });
}
