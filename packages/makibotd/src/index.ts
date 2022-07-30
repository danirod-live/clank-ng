import { createClient, loadConfig } from "./client.js";

loadConfig();

const client = createClient();

function shutdown(code = 0) {
  console.log("Shutting down!");
  client.destroy();
  process.exit(code);
}

/* Some things just don't make sense to configure in the client. */
client.on("shardDisconnect", (e) => {
  if (e.code == 4014 /* DISALLOWED_INTENTS */) {
    console.error("Please, turn on the Privileged Gateway Intents");
    shutdown(1);
  }
});

await client.login(process.env.BOT_TOKEN);

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
