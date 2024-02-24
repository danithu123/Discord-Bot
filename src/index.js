const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("bot online yay boy!!"));

app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);
require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("node:fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.config = require("../config.json");

// Handlers
const functionFiles = readdirSync(`./src/functions/handlers`).filter((file) =>
  file.endsWith(".js")
);
for (const file of functionFiles)
  require(`./functions/handlers/${file}`)(client);

client.login(process.env.TOKEN);
