import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";

import { findUpSync } from "find-up";
import * as dotenv from "dotenv";

export function loadConfig() {
  const path = findUpSync(".env");
  dotenv.config({ path });
}

export function createClient(): Client {
  const client = new Client({
    allowedMentions: {},
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
      Partials.Channel,
    ],
  });

  client.on("ready", () => {
    client.user?.setActivity({
      name: "clank-ng",
      type: ActivityType.Playing,
    });
  });

  return client;
}
