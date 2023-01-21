const { Client, GatewayIntentBits } = require("discord.js");
const { token, users } = require("./config.json");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

client.once("ready", () => {
	console.log("Ready");
});

client.on("messageCreate", async (msg) => {
	if (msg.content === "clean up this damn channel") {
		if (msg.author.id in users) {
			if (users[msg.author.id].includes(msg.channelId)) {
				const reply = msg.reference;

				if (reply === null) {
					return;
				}

				if (reply.channelId === msg.channelId) {
					if ("messageId" in reply) {
						const messages = await msg.channel.messages.fetch({
							after: reply.messageId
						});

						await msg.channel.bulkDelete(messages, true);
					}
				}
			}
		}
	}
});

client.login(token);
