const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const TOKEN = process.env.DISCORD_TOKEN; // sem vlož token z Discord Developer Portálu
const ROLE_ID = "1435029313543208960";
const CHANNEL_ID = "1435018812515811529"; 

client.once("ready", () => {
  console.log(`✅ Bot přihlášen jako ${client.user.tag}`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.channel.id === CHANNEL_ID && reaction.emoji.name === "✅") {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.get(ROLE_ID);

    if (!member.roles.cache.has(ROLE_ID)) {
      await member.roles.add(role);
      console.log(`🎓 Přidána role ${role.name} pro ${user.username}`);
    }
  }
});

client.login(TOKEN);
